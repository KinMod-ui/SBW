import './App.css';

import { Box, Stack } from '@chakra-ui/react';
import MusicPlayer from './components/MusicPlayer';

import MainComp from './components/MainComp';
import { useState } from 'react';
import { songType } from './components/ForYou';
import { shadeColor } from './shadeColor';

export type colorState = {
  color: string;
};

function App() {
  const [color, setColor] = useState<colorState>({
    color: '#0f121a',
  });

  const [songs, setSongs] = useState<songType[]>([]);
  const [picked, setPicked] = useState(-1);
  const [inputRef, setInputRef] = useState<React.RefObject<HTMLInputElement>>();

  const gradientStyle = {
    backgroundImage: `linear-gradient(to left, ${shadeColor(
      color.color,
      -80
    )}, ${shadeColor(color.color, -20)})`,
    /* Add other styles if needed */
  };

  return (
    <>
      {/* <Layout staticComponent={<MusicPlayer />}> */}
      {/* <Routes> */}
      <Stack direction={'row'} spacing={0} style={gradientStyle}>
        <Box
          h="100vh"
          w={'50vw'}
          // bg={color.color}
        >
          <MainComp
            color={color.color}
            setSongs={setSongs}
            setPicked={setPicked}
            setInputRef={setInputRef}
            picked={picked}
          />
        </Box>
        <Box
          h="100vh"
          w={'50vw'}
          // bg={}
        >
          <MusicPlayer
            song={picked > -1 ? songs[picked] : undefined}
            songs={songs}
            setColor={setColor}
            inputRef={inputRef}
            picked={picked}
          />
        </Box>
        {/* <Box h="100vh" w={'50vw'} bg="green" pt={8}>
              Hehe
            </Box> */}
      </Stack>

      {/* </Layout> */}
    </>
  );
}

// const tempSong: songType = {
//   artist: 'Coldplay',
//   duration: 290,
//   photo: 'https://i.scdn.co/image/ab67616d0000b273f864bcdcc245f06831d17ae0',
//   title: 'Adventure of a Lifetime ',
//   url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
// };

export default App;
