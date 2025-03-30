import GetStartedForm from "@/features/GetStartedForm";
import GetStartedTitle from "@/components/ui/landing/GetStartedTitle";

const GetStartedSection = () => {
  return (
    <section className="inset-0 flex flex-col items-center justify-center text-center px-4 h-full bg-[url('/LandingBg.jpeg')] bg-cover bg-fixed">
      <GetStartedTitle />
      <GetStartedForm />
    </section>
  );
};

export default GetStartedSection;
