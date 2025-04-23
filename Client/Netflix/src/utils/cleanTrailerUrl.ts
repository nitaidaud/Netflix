function cleanYouTubeEmbedUrl(dirtyUrl?: string ): string {
    if (!dirtyUrl) {
        return "";
    }
  return dirtyUrl?.replace(/\"/g, "").replace(/\\+$/, "");
}

export default cleanYouTubeEmbedUrl;
