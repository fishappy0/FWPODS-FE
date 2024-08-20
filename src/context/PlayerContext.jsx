import { createContext, useRef, useState, useEffect, useMemo } from "react";
import { songMusicService } from "../services/SongMusicService";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef();
  const seekBar = useRef();

  const [songData, setSongData] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = useMemo(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setPlayStatus(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    };
  }, [audioRef]);

  const pause = useMemo(() => {
    return () => {
    audioRef.current.pause();
    setPlayStatus(false);
    }
  }, [audioRef]);

  const playSong = async (song) => {
    setSongData(song);
    try {
      const token = localStorage.getItem("token");
      const data = await songMusicService(token, song.song_id);
      // console.log(data);
      if (audioRef.current) {
        audioRef.current.src = data.url;
        await audioRef.current.play();
        setPlayStatus(true);
      }
    } catch (error) {
      console.error("Error playing song: ", error);
    }
  };

  const previous = async () => {
    //TODO: implements playing previous song
  };

  const next = async () => {
    //TODO: implements playing next song
  };

  const seekSong = useMemo(() => {
    return async (event) => {
      if (audioRef.current) {
        audioRef.current.currentTime =
          (event.nativeEvent.offsetX / seekBg.current.offsetWidth) *
          audioRef.current.duration;
      }
    };
  }, [audioRef, seekBg]);

  // TODO: fix reloads every time the time and the seekbar changes.
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = () => {
          seekBar.current.style.width =
            Math.floor(
              (audioRef.current.currentTime / audioRef.current.duration) * 100
            ) + "%";
          setTime({
            currentTime: {
              second: Math.floor(audioRef.current.currentTime % 60),
              minute: Math.floor(audioRef.current.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(audioRef.current.duration % 60),
              minute: Math.floor(audioRef.current.duration / 60),
            },
          });
        };
      }
    };

    updateTime();
  });

  const contextValue = useMemo(
    () => ({
      audioRef,
      seekBar,
      seekBg,
      songData,
      setSongData,
      playStatus,
      setPlayStatus,
      time,
      setTime,
      play,
      pause,
      playSong,
      previous,
      next,
      seekSong,
    }),
    [
      audioRef,
      seekBar,
      seekBg,
      songData,
      setSongData,
      playStatus,
      setPlayStatus,
      time,
      setTime,
      play,
      pause,
      previous,
      next,
      seekSong,
    ]
  );

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
