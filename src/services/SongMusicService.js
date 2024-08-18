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

    const data = await response.json()
    return data
}