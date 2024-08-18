import NavBar from "./NavBar";
import SongItem from "./SongItem";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";

import { songDataService } from "../services/SongDataService";
import { songIdsService } from "../services/SongIdsService";

const Home = () => {
  const token = localStorage.getItem("token")
  const [songIds, setSongIds] = useState([]);
  const [songData, setSongData] = useState([]);
  const songs_number = 50; // number of songs, defaulting to 50 for the time being.

  // get a list of song ids.
  useEffect(() => {
    const getSongIds = async () => {
      try {
        const ids = await songIdsService(token, songs_number)
        setSongIds(ids)
      } catch (error) {
        toast.error(`Error fetching songs: ${error}`)
      }
    };

    getSongIds();
  }, [token, songs_number]);

  // get the song's info
  useEffect(() => {
    if (songIds.length === 0) return

    const getSongInfo = async () => {
      try {
        // get one song at a time
        const songId = songIds.map(async (songIds) => {
          const data = await songDataService(token, songIds)
          return data
        })

        const results = await Promise.all(songId)
        setSongData(results)
      } catch (error) {
        toast.error(`Error fetching song data: ${error}`)
      }
    }

    getSongInfo()
  }, [token, songIds])

  return (
    <>
      <NavBar />
      <ToastContainer autoClose={2000} />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Discover songs</h1>
        <div className="flex flex-wrap gap-4 md:overflow-hidden">
          {songData.map((item) => (
            // Don't remove any items from the SongItem component unless you're abosultely certain of what you're doing.
            <SongItem
              key={uuidv4()}
              id={item.song_id}
              name={item.song_name}
              artist={item.artist}
              image={item.image}
              song={item}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
