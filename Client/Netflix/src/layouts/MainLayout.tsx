import { ReactNode, useEffect, useTransition } from "react";
import { useAppDispatch } from "../store/Store";
import { checkAuth } from "../store/slice/auth.slice";
import { LucideLoader } from "lucide-react";
import NetflixNavBar from "../components/shared/NeftlixNavBar";

type MainLayoutProps = {
  children: ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  // const [isPending, startTransition] = useTransition();
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   startTransition(async () => {
  //     await dispatch(checkAuth());
  //   });
  // }, [dispatch]);

  // if (isPending) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <LucideLoader className="animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <>
      <NetflixNavBar />
      {children}
    </>
  );
};

export default MainLayout;
