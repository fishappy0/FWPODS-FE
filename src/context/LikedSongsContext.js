import { createContext, useState } from "react";

export const LikedSongsContext = createContext();

export const LikedSongsProvider = ({ children }) => {
    const [likedSongs, setLikedSongs] = useState([]);

    const addLikedSong = (song) => {
        setLikedSongs([...likedSongs, song]);
    }

    const removeLikedSong = (song_id) => {
        setLikedSongs(likedSongs.filter(song => song.song_id !== song_id));
    }

    return (
        <LikedSongsContext.Provider value={{ likedSongs, setLikedSongs, addLikedSong, removeLikedSong }}>
            {children}
        </LikedSongsContext.Provider>
    );
}