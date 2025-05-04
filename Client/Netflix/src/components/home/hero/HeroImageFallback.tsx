type HeroImageFallbackProps = {
    src: string;
    alt: string;
    hidden: boolean;
  };
  
  const HeroImageFallback = ({ src, alt, hidden }: HeroImageFallbackProps) => (
    <img
      src={src}
      alt={alt}
      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    />
  );
export default HeroImageFallback;  