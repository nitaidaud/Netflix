const EpisodeLoadingPlaceholder = () => {
    return (
      <div className="object-cover relative w-[800px] h-full flex flex-col" >
        {/* Header placeholder - similar to ModalHeader */}
        <div className="w-full h-[400px] bg-neutral-800 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="h-8 bg-neutral-600 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-neutral-500 rounded w-1/2 mb-4 animate-pulse"></div>
           
          </div>
        </div>
  
        {/* Season selection placeholder */}
        <div className="w-full p-4 border-b border-white/10">
          <div className="h-8 bg-neutral-700 rounded w-48 animate-pulse"></div>
        </div>
  
       
      </div>
    );
  };
  
  export default EpisodeLoadingPlaceholder;