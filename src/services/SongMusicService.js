export const songMusicService = async (token, songId) => {
    const response = await fetch("https://musicbe.fishand.me/get_song", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Authorization: token,
            song_id: songId
        })
    })

    const contentType = response.headers.get("Content-Type")
    if (contentType?.startsWith("audio")) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        return { url }
    }
}