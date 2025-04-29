import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="text-sm text-gray-400 hover:text-white underline underline-offset-4 transition-all mx-auto"
      size="sm"
      asChild
    >
      <Link to={href} className="back-btn">
        {label}
      </Link>
    </Button>
  );
};
