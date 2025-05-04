
const LoadingContentAnimation = () => {
  return (
    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-2 gap-y-8">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full aspect-[16/10] bg-neutral-700 animate-pulse rounded-sm"
            />
          ))}
        </div>
  )
}

export default LoadingContentAnimation