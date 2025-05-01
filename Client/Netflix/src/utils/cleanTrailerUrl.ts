function cleanYouTubeEmbedUrl(dirtyUrl?: string ): string | null {
    if (!dirtyUrl) {
        return null;
    }
  return dirtyUrl?.replace(/\"/g, "").replace(/\\+$/, "");
}

export default cleanYouTubeEmbedUrl;
