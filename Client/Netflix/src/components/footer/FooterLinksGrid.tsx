const FooterLinksGrid = () => {
    const footerLinks = [
      [
        "Audio Description",
        "Investor Relations",
        "Privacy",
        "Contact Us"
      ],
      [
        "Help Center",
        "Jobs",
        "Legal Notices",
        "Do Not Sell or Share My Personal Information"
      ],
      [
        "Gift Cards",
        "Netflix Shop",
        "Cookie Preferences",
        "Ad Choices"
      ],
      [
        "Media Center",
        "Terms of Use",
        "Corporate Information"
      ]
    ];
  
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {footerLinks.map((linkGroup, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            {linkGroup.map((link, linkIndex) => (
              <p key={linkIndex}>{link}</p>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default FooterLinksGrid;