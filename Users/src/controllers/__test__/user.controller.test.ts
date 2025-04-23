import request from "supertest";
import { app } from "../../app";
import { Prisma } from "../../../prisma/generated/test-client";
import { prisma } from "../../../prisma/prisma";

describe("Test for users controller", () => {
  describe("signup", () => {
    it("should return 201 if signup successfully", async () => {
      const res = await request(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "test password",
        name: "test name",
      });

      expect(res.status).toBe(201);
    });

    it("should return 400 if signup failed", async () => {
      const res = await request(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "test password",
      });
      expect(res.status).toBe(400);
    });
  });

  describe("login", () => {
    it("should return 200 if login successfully", async () => {
      // First, we need to sign up the user before logging in
      await request(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "test password",
        name: "test name",
      });

      // Now we can log in the user
      const res = await request(app).post("/api/users/login").send({
        email: "test@test.com",
        password: "test password",
      });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it("should return 400 if login failed", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "test@test.com",
        password: "test password",
      });
      expect(res.status).toBe(400);
    });
  });

  describe("logout", () => {
    it("should return 201 if logout successfully", async () => {
      const res = await request(app).post("/api/users/logout").send({});
      expect(res.status).toBe(201);
      expect(res.body.token).toBe(undefined);
    });

    it("should return 401 if logout failed", async () => {
      const res = await request(app).post("/api/users/logout").send({});
      expect(res.status).toBe(401);
    });
  });

  describe("getUser", () => {
    it("should return 200 if get user successfully", async () => {
      // First, we need to sign up the user before getting user
      await request(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "test password",
        name: "test name",
      });

      // Now we can get the user
      const res = await request(app).get("/api/users/get-user").send({});
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it("should return 401 if get user failed", async () => {
      const res = await request(app).get("/api/users/get-user").send({});
      expect(res.status).toBe(401);
    });
  });

  describe("updateUser", () => {
    it("should return 200 if update user successfully", async () => {
      // First, we need to sign up the user before updating user
      await request(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "test password",
        name: "test name",
      });

      // Now we can update the user
      const res = await request(app).patch("/api/users/update-user").send({
        password: "test password",
        name: "test name",
      });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it("should return 401 if update user failed", async () => {
      const res = await request(app)
        .patch("/api/users/update-user")
        .send({ password: "test password", name: "test name" });
      expect(res.status).toBe(401);
    });
  });

  describe("sendVerificationMail", () => {
    it("should return 200 if send verification mail successfully", async () => {
      // First, we need to sign up the user before sending verification mail
      await request(app).post("/api/users/signup").send({
        email: "nitaidaud@gmail.com",
        password: "test password",
        name: "test name",
      });

      // Now we can send verification mail
      const res = await request(app)
        .post("/api/users/send-email")
        .send({ email: "nitaidaud@gmail.com" });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it("should return 401 if send verification mail failed", async () => {
      const res = await request(app)
        .post("/api/users/send-email")
        .send({ email: "nitaidaud@gmail.com" });
      expect(res.status).toBe(401);
    });
  });

  describe("verifyEmail", () => {
    it("should return 200 if verify email successfully", async () => {
      // First, we need to sign up the user before verifying email
      const email = "nitaidaud@gmail.com";
      await request(app).post("/api/users/signup").send({
        email,
        password: "test password",
        name: "test name",
      });

      // Send verification email
      await request(app).post("/api/users/send-email").send({ email });

      const tokenRecord = await prisma.verificationToken.findFirst({
        where: { email },
      });

      expect(tokenRecord).toBeTruthy();

      // Use the token in the verify-email endpoint
      const res = await request(app)
        .post(`/api/users/verify-email/${tokenRecord!.token}`) // use actual token here
        .send();

      expect(res.status).toBe(200);

      it("should return 401 if verify email failed", async () => {
        const res = await request(app)
          .post(`/api/users/verify-email/${tokenRecord!.token}`)
          .send({ tokenId: "test token id" });
        expect(res.status).toBe(401);
      });
    });
  });

  describe("resetPassword", () => {
    it("should return 200 if reset password successfully", async () => {
      // First, we need to sign up the user before resetting password
      const email = "nitaidaud@gmail.com";
      await request(app).post("/api/users/signup").send({
        email,
        password: "test password",
        name: "test name",
      });

      // Send verification email
      await request(app).post("/api/users/send-email").send({ email });

      const tokenRecord = await prisma.verificationToken.findFirst({
        where: { email },
      });

      expect(tokenRecord).toBeTruthy();

      // Now we can reset the password
      const res = await request(app)
        .patch(`/api/users/reset-password/${tokenRecord!.token}`) // use actual token here
        .send({ password: "new test password" });
      expect(res.status).toBe(200);
    });

    it("should return 401 if reset password failed", async () => {
      const res = await request(app)
        .patch("/api/users/reset-password/test token")
        .send({ password: "new test password" });
      expect(res.status).toBe(401);
    });
  });

  describe("sendMailForgotPassword", () => {
    it("should return 200 if send mail forgot password successfully", async () => {
      // First, we need to sign up the user before sending mail forgot password
      await request(app).post("/api/users/signup").send({
        email: "nitaidaud@gmail.com",
        password: "test password",
        name: "test name",
      });

      // Now we can send mail forgot password
      const res = await request(app)
        .post("/api/users/forgot-password")
        .send({ email: "nitaidaud@gmail.com" });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it("should return 400 if email not found", async () => {
      const res = await request(app)
        .post("/api/users/forgot-password")
        .send({ email: "nitaidaud@gmail.com" });
      expect(res.status).toBe(400);
    });

    it("should return 401 if send mail forgot password failed", async () => {
      const res = await request(app)
        .post("/api/users/forgot-password")
        .send({ email: "nitaidaud@gmail.com" });
      expect(res.status).toBe(401);
    });
  });

  describe("checkAuth", () => {
    it("should return 200 if check auth successfully", async () => {
      // First, we need to sign up the user before checking auth
      await request(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "test password",
        name: "test name",
      });

      // Now we can check auth
      const res = await request(app).post("/api/users/check-auth").send();
      expect(res.status).toBe(200);
    });

    it("should return 401 if check auth failed", async () => {
      const res = await request(app).post("/api/users/check-auth").send();
      expect(res.status).toBe(401);
    });
  });
});
