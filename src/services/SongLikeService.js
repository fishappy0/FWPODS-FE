export const getLikedSongsService = async (token, song_id) => {
    const response = await fetch("https://musicbe.fishand.me/get_song_like", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Authorization: token,
            Song_id: song_id,
        }),
    });

    return response
}

export const likingSongService = async (token, song_id) => {
    const response = await fetch("https://musicbe.fishand.me/like_song", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Authorization: token,
            Song_id: song_id,
        }),
    });

    return response.json()
}