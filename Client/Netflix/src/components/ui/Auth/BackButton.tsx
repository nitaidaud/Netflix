import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
    return (
        <Button variant='link' className="font-normal w-fit mx-auto text-muted-foreground text-lg" size='sm' asChild>
            <Link to={href} className="back-btn">
                {label}
            </Link>
        </Button>
    )

}