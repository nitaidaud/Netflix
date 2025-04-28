import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-[#111] text-zinc-400 px-8 py-12 text-sm static bottom-0 w-full">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Social Icons */}
        <div className="flex gap-4">
          <Link to="#"><img src="/icons/facebook_icon.png" alt="Facebook" className="w-6 h-6" /></Link>
          <Link to="#"><img src="/icons/instagram_icon.png" alt="Instagram" className="w-6 h-6" /></Link>
          <Link to="#"><img src="/icons/twitter_icon.png" alt="Twitter" className="w-6 h-6" /></Link>
          <Link to="#"><img src="/icons/youtube_icon.png" alt="YouTube" className="w-6 h-6" /></Link>
        </div>

        {/* Grid Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p>Audio Description</p>
            <p>Investor Relations</p>
            <p>Privacy</p>
            <p>Contact Us</p>
          </div>
          <div className="space-y-2">
            <p>Help Center</p>
            <p>Jobs</p>
            <p>Legal Notices</p>
            <p>Do Not Sell or Share My Personal Information</p>
          </div>
          <div className="space-y-2">
            <p>Gift Cards</p>
            <p>Netflix Shop</p>
            <p>Cookie Preferences</p>
            <p>Ad Choices</p>
          </div>
          <div className="space-y-2">
            <p>Media Center</p>
            <p>Terms of Use</p>
            <p>Corporate Information</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-2">
          <button className="border border-zinc-400 px-3 py-1 text-xs">Service Code</button>
          <p className="text-xs text-zinc-500">© 1997–2024 Netflix, Inc.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
