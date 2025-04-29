import GetStartedForm from "@/features/GetStartedForm";
import GetStartedTitle from "./GetStartedTitle";

const GetStartedSection = () => {
  return (
    <section className="relative inset-0 flex flex-col items-center justify-center text-center px-4 h-full bg-[url('/LandingBg.jpeg')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="z-10 flex flex-col items-center gap-4">
        <GetStartedTitle />
        <GetStartedForm />
      </div>
    </section>
  );
};

export default GetStartedSection;
