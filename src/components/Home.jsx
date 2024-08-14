import NavBar from "./NavBar";
import { albumsData, songsData } from "../../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext, useEffect } from "react";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [songIds, setSongIds] = useState([]);
  // const [songDataList, setSongDataList] = useState([]);
  const songs_number = 10; // number of songs, defaulting to 10 for the time being.

  // get a list of song ids.
  useEffect(() => {
    const getSongIds = async () => {
      try {
        const response = await fetch(
          "https://musicbe.fishand.me/get_random_songs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Authorization: token,
              Songs_number: songs_number,
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        setSongIds(data.songs);
      } catch (error) {
        toast.error(`Error fetching song: ${error}`);
      }
    };

    getSongIds();
  }, [token, songIds]);

  return (
    <>
      <NavBar />
      <ToastContainer autoClose={3000} />
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
