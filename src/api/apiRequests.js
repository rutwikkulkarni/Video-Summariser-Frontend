export const getSummary = async (url) =>
    await fetch(`${import.meta.env.VITE_FLASK_SERVER_URL}/summarise/youtube?` + new URLSearchParams({
        url: url
    }))