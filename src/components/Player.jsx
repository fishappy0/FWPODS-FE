import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { HiHeart } from "react-icons/hi2";
import { BsHeartFill } from "react-icons/bs";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { PiPauseFill, PiPlayFill } from "react-icons/pi";

const Player = () => {
  const {
    songData,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = async () => {
    setIsFavorite(!isFavorite);
  };

  const formatTime = (time) => {
    if (time < 10) return String(time).padStart(2, "0");
    else return time;
  };

  if (!songData) {
    // Handle case when track is null or undefined
    return (
      <div className="mt-4 bg-black flex justify-center items-center text-white px-4">
        <p className="text-xl font-bold">No track selected</p>
      </div>
    );
  }

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={songData.image} alt="" />
        <div>
          <p>{songData.song_name}</p>
          <p>{songData.artist}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <button className="cursor-pointer" onClick={previous}>
            <GiPreviousButton size={30} />
          </button>
          {playStatus ? (
            <button className="cursor-pointer" onClick={pause}>
              <PiPauseFill size={25} />
            </button>
          ) : (
            <button className="cursor-pointer" onClick={play}>
              <PiPlayFill size={25} />
            </button>
          )}
          <button className="cursor-pointer" onClick={next}>
            <GiNextButton size={30} />
          </button>
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{formatTime(time.currentTime.second)}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{formatTime(time.totalTime.second)}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <button onClick={handleFavorite}>
          {isFavorite ? (
            <BsHeartFill size={25} style={{ color: "red" }} />
          ) : (
            <HiHeart size={30} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Player;
