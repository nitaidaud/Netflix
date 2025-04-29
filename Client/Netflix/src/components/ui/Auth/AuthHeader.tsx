import Typography from "@/components/shared/Typography";

interface HeaderProps {
    label: string;
    title: string;
}

const AuthHeader = ({ title, label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center mb-4">
      <Typography
        size="text-2xl"
        weight="font-bold"
        color="text-white"
        
      >
        {title}
      </Typography>

      {label && (
        <Typography
          size="text-sm"
          weight="font-normal"
          color="text-gray-500"
          spacing="tracking-normal"
          className="mt-1 leading-snug"
        >
          {label}
        </Typography>
      )}
    </div>
  );
};


export default AuthHeader;