import NavBar from "./NavBar";
import { albumsData, songsData } from "../../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <NavBar />
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
