export const fetchSongIds = async (token, songs_number) => {
    const response = await fetch("https://musicbe.fishand.me/get_random_songs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Authorization: token,
            Songs_number: songs_number,
        }),
    });

    const data = await response.json();
    return data.songs;
};
