export const songDataService = async (token, songId, retries = 5) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch("https://musicbe.fishand.me/get_song_info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Authorization: token,
                    song_id: songId
                })
            });

            // Check if the content type is JSON
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Expected JSON, got ${contentType}`);
            }

        } catch (error) {
            console.error("Error fetching song data ", error);
        }
    }

    return null; // or throw an error depending on your needs
};
