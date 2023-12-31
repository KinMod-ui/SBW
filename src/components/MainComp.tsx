import { Route, Routes } from 'react-router-dom';
import ForYou, { songType } from './ForYou';
import TopTracks from './TopTracks';
import Favourites from './Favourties';
import RecentlyPlayed from './RecentlyPlayed';

type props = {
  color: string;
  setSongs: React.Dispatch<React.SetStateAction<songType[]>>;
  setPicked: React.Dispatch<React.SetStateAction<string>>;
  setInputRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLInputElement> | undefined>
  >;
  picked: string;
};

const MainComp: React.FC<props> = ({
  color,
  setSongs,
  setPicked,
  setInputRef,
  picked,
}) => {
  // console.log(color);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ForYou
            color={color}
            setSongs={setSongs}
            setPicked={setPicked}
            picked={picked}
            setInputRef={setInputRef}
          />
        }
      />
      <Route
        path="/toptracks"
        element={
          <TopTracks
            color={color}
            setSongs={setSongs}
            setPicked={setPicked}
            picked={picked}
          />
        }
      />
      <Route
        path="/favourites"
        element={
          <Favourites
            color={color}
            setSongs={setSongs}
            setPicked={setPicked}
            picked={picked}
          />
        }
      />
      <Route
        path="/recentlyplayed"
        element={
          <RecentlyPlayed
            color={color}
            setSongs={setSongs}
            setPicked={setPicked}
            picked={picked}
          />
        }
      />
    </Routes>
  );
};

export default MainComp;
