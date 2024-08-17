export const fetchSongData = async (token, song_id) => {
    const response = await fetch("https://musicbe.fishand.me/get_song_info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Authorization: token,
            song_id: song_id
        })
    })

    const data = await response.json()
    return data
}