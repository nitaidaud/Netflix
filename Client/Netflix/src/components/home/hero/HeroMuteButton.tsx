import { Volume2, VolumeX } from "lucide-react";

type HeroMuteButtonProps = {
    isMuted: boolean;
    toggleMute: () => void;
  };
  
  const HeroMuteButton = ({ isMuted, toggleMute }: HeroMuteButtonProps) => (
    <button
      onClick={toggleMute}
      className="absolute bottom-10 right-4 text-white border-white border p-1 rounded-full z-20"
    >
      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
export default HeroMuteButton;  