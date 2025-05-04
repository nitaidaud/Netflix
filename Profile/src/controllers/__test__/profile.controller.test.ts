import { mockRequest, mockResponse } from "jest-mock-req-res";
import IProfileService from "../../Interfaces/IProfileService";
import { ProfileController } from "../profile.controller";
import TOKENS from "../../../tokens";
import { Type } from "../../../prisma/generated/test-client";

jest.mock("../../utils/jwt", () => ({
  sign: jest.fn(() => "signedToken"),
  verify: jest.fn(() => ({ id: "profileId" })),
}));

jest.mock("../../utils/handle-error-request", () => ({
  handleError: jest.fn((res, error) =>
    res.status(500).json({ message: error.message }),
  ),
}));

jest.mock("../../utils/profileImage", () => ({
  __esModule: true,
  default: jest.fn(() => "mocked/image/url"),
}));

describe("ProfileController", () => {
  let controller: ProfileController;
  let mockService: jest.Mocked<IProfileService>;
  let req: ReturnType<typeof mockRequest>;
  let res: ReturnType<typeof mockResponse>;

  beforeEach(() => {
    mockService = {
      login: jest.fn(),
      getProfileByToken: jest.fn(),
      createProfile: jest.fn(),
      updateProfile: jest.fn(),
      addMovieToFavoriteList: jest.fn(),
      removeMovieFromFavoriteList: jest.fn(),
      getFavoritesList: jest.fn(),
      deleteProfile: jest.fn(),
      getAllProfiles: jest.fn(),
    };

    controller = new ProfileController(mockService);
    req = mockRequest();
    res = mockResponse();
  });

  it("login - success", async () => {
    req.cookies.Token = "token";
    req.body = { name: "test", image: null };
    mockService.login.mockResolvedValue("profileToken");

    await controller.login(req, res);

    expect(res.cookie).toHaveBeenCalledWith(
      TOKENS.Token,
      "profileToken",
      expect.any(Object),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("login - failure", async () => {
    req.cookies.Token = "token";
    req.body = { name: "test", image: null };
    mockService.login.mockRejectedValue(new Error("Login failed"));

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("logout - success", async () => {
    req.cookies.profileToken = "profileToken";

    await controller.logout(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith(
      TOKENS.Token,
      expect.any(Object),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("checkLoggedProfile - success", async () => {
    req.cookies.Token = "token";
    req.cookies.profileToken = "profileToken";
    const mockProfile = {
      id: "1",
      name: "test",
      image: null,
      favoriteList: null,
    };
    mockService.getProfileByToken.mockResolvedValue(mockProfile);

    await controller.checkLoggedProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("checkLoggedProfile - failure", async () => {
    req.cookies.Token = "token";
    req.cookies.profileToken = "profileToken";
    mockService.getProfileByToken.mockResolvedValue(null);

    await controller.checkLoggedProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("getProfileById - profile found", async () => {
    req.cookies.profileToken = "token";
    mockService.getProfileByToken.mockResolvedValue({
      name: "A",
      image: null,
      favoriteList: null,
    });

    await controller.getProfileById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getProfileById - failure", async () => {
    req.cookies.profileToken = "token";
    mockService.getProfileByToken.mockRejectedValue(new Error("Not found"));

    await controller.getProfileById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("createProfile - success", async () => {
    req.cookies.Token = "token";
    req.body = { name: "test", image: null };
    req.file = {
      fieldname: "file",
      originalname: "test.jpg",
      encoding: "7bit",
      mimetype: "image/jpeg",
      size: 1024,
      buffer: Buffer.from(""),
      destination: "",
      filename: "test.jpg",
      path: "",
      stream: null as any,
    };
    mockService.createProfile.mockResolvedValue({
      id: "1",
      name: "test",
      image: "mocked/image/url",
      favoriteList: null,
    });

    await controller.createProfile(req, res);

    expect(res.cookie).toHaveBeenCalledWith(
      TOKENS.Token,
      "signedToken",
      expect.any(Object),
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("createProfile - failure", async () => {
    req.cookies.Token = "token";
    req.body = { name: "test", image: null };
    mockService.createProfile.mockRejectedValue(new Error("Create failed"));

    await controller.createProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("updateProfile - success", async () => {
    req.cookies.profileToken = "token";
    req.body = { name: "newName" };
    req.file = {
      fieldname: "file",
      originalname: "test.jpg",
      encoding: "7bit",
      mimetype: "image/jpeg",
      size: 1024,
      buffer: Buffer.from(""),
      destination: "",
      filename: "test.jpg",
      path: "",
      stream: null as any,
    };
    mockService.getProfileByToken.mockResolvedValue({
      name: "test",
      image: "image.jpg",
      favoriteList: null,
    });
    mockService.updateProfile.mockResolvedValue({
      name: "newName",
      image: "mocked/image/url",
      favoriteList: null,
    });

    await controller.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("updateProfile - failure", async () => {
    req.cookies.profileToken = "token";
    req.body = { name: "newName" };
    mockService.getProfileByToken.mockResolvedValue({
      name: "test",
      image: "image.jpg",
      favoriteList: null,
    });
    mockService.updateProfile.mockRejectedValue(new Error("Update failed"));

    await controller.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("addMovieToFavoriteList - success", async () => {
    req.cookies.profileToken = "token";
    req.body = {
      id: 1,
      adult: false,
      backdrop_path: "",
      overview: "",
      popularity: 0,
      poster_path: "",
      release_date: "",
      title: "Movie",
      type: Type.Movie,
    };
    mockService.addMovieToFavoriteList.mockResolvedValue({
      favoriteList: [req.body],
    });

    await controller.addMovieToFavoriteList(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("addMovieToFavoriteList - failure", async () => {
    req.cookies.profileToken = "token";
    req.body = {
      id: 1,
      adult: false,
      backdrop_path: "",
      overview: "",
      popularity: 0,
      poster_path: "",
      release_date: "",
      title: "Movie",
      type: Type.Movie,
    };
    mockService.addMovieToFavoriteList.mockRejectedValue(
      new Error("Add failed"),
    );

    await controller.addMovieToFavoriteList(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("removeMovieFromFavoriteList - success", async () => {
    req.cookies.profileToken = "token";
    req.body = { movieId: 1 };
    mockService.removeMovieFromFavoriteList.mockResolvedValue({
      favoriteList: [],
    });

    await controller.removeMovieFromFavoriteList(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("removeMovieFromFavoriteList - failure", async () => {
    req.cookies.profileToken = "token";
    req.body = { movieId: 1 };
    mockService.removeMovieFromFavoriteList.mockRejectedValue(
      new Error("Remove failed"),
    );

    await controller.removeMovieFromFavoriteList(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("deleteProfile - success", async () => {
    req.body = { name: "test" };
    mockService.deleteProfile.mockResolvedValue(true);

    await controller.deleteProfile(req, res);

    expect(res.clearCookie).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deleteProfile - failure", async () => {
    req.body = { name: "test" };
    mockService.deleteProfile.mockRejectedValue(new Error("Delete failed"));

    await controller.deleteProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("getFavoriteList - success with data", async () => {
    req.cookies.profileToken = "token";
    const movie = {
      id: 1,
      adult: false,
      backdrop_path: "",
      overview: "",
      popularity: 0,
      poster_path: "",
      release_date: "",
      title: "Movie",
      type: Type.Movie,
    };
    mockService.getFavoritesList.mockResolvedValue([movie]);

    await controller.getFavoriteList(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getFavoriteList - failure", async () => {
    req.cookies.profileToken = "token";
    mockService.getFavoritesList.mockRejectedValue(new Error("List failed"));

    await controller.getFavoriteList(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("getAllProfiles - success", async () => {
    req.cookies.Token = "token";
    mockService.getAllProfiles.mockResolvedValue([
      { name: "test", image: null, favoriteList: null },
    ]);

    await controller.getAllProfiles(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getAllProfiles - failure", async () => {
    req.cookies.Token = "token";
    mockService.getAllProfiles.mockRejectedValue(new Error("Get all failed"));

    await controller.getAllProfiles(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
