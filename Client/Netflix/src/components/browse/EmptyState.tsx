
type EmptyStateProps = {
  category?: string;
  searchQuery?: string;
};

const EmptyState = ({ category, searchQuery }: EmptyStateProps) => {
  let message = "No movies found";
  
  if (searchQuery) {
    message = `No movies found for search: "${searchQuery}"`;
  } else if (category) {
    message = `No movies found in category: "${category}"`;
  }
  
  return (
    <p className="text-white text-center my-10 text-lg">
      {message}
    </p>
  );
};

export default EmptyState;