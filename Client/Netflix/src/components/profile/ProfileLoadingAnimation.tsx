const ProfileLoadingAnimation = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center space-y-3"
          >
            <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] bg-neutral-700 animate-pulse" />
            <div className="w-15 h-4 bg-neutral-600 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  };
  
  export default ProfileLoadingAnimation;
  