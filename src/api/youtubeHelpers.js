export const getYouTubeEmbedUrl = (url) => {
    // Extract the video ID from the URL
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null

    // If a valid video ID is found, construct the embed URL
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
    } else {
        // If the URL is not recognized as a valid YouTube URL, return the original URL
        return url
    }
};