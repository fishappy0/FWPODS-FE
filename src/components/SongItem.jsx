import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ id, name, artist, image, song }) => {
  const { playSong } = useContext(PlayerContext);
  return (
    <button onClick={() => playSong(song)}>
      <div className="max-w-[10vw] max-h-[15vh] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className="rounded" src={image} alt="" />
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm">{artist}</p>
      </div>
    </button>
  );


};

export default SongItem;
