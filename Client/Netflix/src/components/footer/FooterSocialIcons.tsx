import { Link } from "react-router-dom";

const FooterSocialIcons = () => {
  const socialLinks = [
    { icon: "/icons/facebook_icon.png", alt: "Facebook" },
    { icon: "/icons/instagram_icon.png", alt: "Instagram" },
    { icon: "/icons/twitter_icon.png", alt: "Twitter" },
    { icon: "/icons/youtube_icon.png", alt: "YouTube" },
  ];

  return (
    <div className="flex gap-4">
      {socialLinks.map((social, index) => (
        <Link key={index} to="#">
          <img src={social.icon} alt={social.alt} className="w-6 h-6" />
        </Link>
      ))}
    </div>
  );
};

export default FooterSocialIcons;