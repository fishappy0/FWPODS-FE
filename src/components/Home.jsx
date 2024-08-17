import NavBar from "./NavBar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { fetchSongIds } from "../api/fetchSongIds";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";

import { albumsData, songsData } from "../../assets/assets";
import { fetchSongData } from "../api/fetchSongData";

const Home = () => {
  const token = localStorage.getItem("token")
  const [songIds, setSongIds] = useState([]);
  const [songData, setSongData] = useState([]);
  const songs_number = 10; // number of songs, defaulting to 10 for the time being.

  // get a list of song ids.
  useEffect(() => {
    const getSongIds = async () => {
      try {
        const ids = await fetchSongIds(token, songs_number)
        setSongIds(ids)
      } catch (error) {
        toast.error(`Error fetching songs: ${error}`)
      }
    };

    getSongIds();
  }, [token]);

  console.log(songIds)

  // get the song's info
  useEffect(() => {
    if (songIds.length === 0) return

    const getSongInfo = async () => {
      try {
        // get one song at a time
        const songId = songIds.map(async (songIds) => {
          console.log("Song ID: ", songIds)
          const data = await fetchSongData(token, songIds)
          return data
        })

        const results = await Promise.all(songId)
        console.log("Song info: ", results)
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
        <h1 className="my-5 font-bold text-2xl">Favorited songs</h1>
        <div className="flex overflow-auto md:overflow-hidden">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Discover songs</h1>
        <div className="flex overflow-auto md:overflow-hidden">
          {songsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
