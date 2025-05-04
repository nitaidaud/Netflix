import FooterBottom from "../footer/FooterBottom";
import FooterLinksGrid from "../footer/FooterLinksGrid";
import FooterSocialIcons from "../footer/FooterSocialIcons";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-zinc-400 px-8 py-12 text-sm w-full mt-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <FooterSocialIcons />
        <FooterLinksGrid />
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
