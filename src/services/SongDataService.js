export const songDataService = async (token, songId) => {
    const response = await fetch("https://musicbe.fishand.me/get_song_info", {
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