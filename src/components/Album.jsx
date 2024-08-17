import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { songsData, albumsData } from "../../assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Album = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const { playWithId } = useContext(PlayerContext);

  return (
    <>
      <NavBar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4 className="">{albumData.desc}</h4>
          <p className="mt-1">
            {/* <img src={} alt="" /> */}
            {/* Be sure to change artist name (the one below this) too*/}
            <b>Spotify</b>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#A7A7A7]">
        <p>
          <b className="mr-6">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <p className="m-auto">Duration</p>
      </div>
      <hr />
      {songsData.map((item, index) => (
        <div
          onClick={() => playWithId(item.id)}
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#A7A7A7] hover:bg-[#FFFFFF2B] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-6 text-[#A7A7A7]">{index + 1}</b>
            <img className="inline w-10 mr-4 rounded" src={item.image} alt="" />
            {item.name}
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden:sm-block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  );
};

export default Album;
