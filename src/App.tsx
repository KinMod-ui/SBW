import './App.css';

import { Box, Stack } from '@chakra-ui/react';
import MusicPlayer from './components/MusicPlayer';

import MainComp from './components/MainComp';
import { useState } from 'react';
import { songType } from './components/ForYou';
import { shadeColor } from './shadeColor';
import Sidebar from './components/Sidebar';

export type colorState = {
  color: string;
};

function App() {
  const [color, setColor] = useState<colorState>({
    color: '#0f121a',
  });

  const [songs, setSongs] = useState<songType[]>([]);
  const [picked, setPicked] = useState('-1');
  const [inputRef, setInputRef] = useState<React.RefObject<HTMLInputElement>>();

  const gradientStyle = {
    backgroundImage: `linear-gradient(to left, ${shadeColor(
      color.color,
      -80
    )}, ${shadeColor(color.color, -20)})`,
    transition: 'background-image 1s ease ',
    /* Add other styles if needed */
  };

  return (
    <>
      {/* <Layout staticComponent={<MusicPlayer />}> */}
      {/* <Routes> */}
      <Stack
        direction={{ base: 'column', md: 'row' }}
        // spacing={{ base: '6vh', md: 0 }}
        height={'100vh'}
        style={gradientStyle}
        spacing={'auto'}
        justify={'space-between'}
      >
        <Box className="h-[15vh] w-100vw md:w-20vw md:h-100vh">
          <Sidebar />
        </Box>
        <Stack
          direction={{ base: 'column-reverse', md: 'row' }}
          h={{ base: '70vh', md: '100vh' }}
          w={'80vw'}
          // bg={color.color}
          // mt={{ base: '10vh', md: 0 }}
          spacing={{ base: '5vh', md: '0' }}
        >
          <Box
            h={{ base: '5vh', md: 'auto' }}
            mb={{ base: '5vh', md: '0' }}
            className="w-[90vw] md:w-[30vw] flex align-middle justify-center "
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
            // bg={}
            className="w-[86vw] md:w-[50vw] "
          >
            <MusicPlayer
              song={
                picked.split(' ')[0] !== '-1'
                  ? songs[+picked.split(' ')[0]]
                  : undefined
              }
              songs={songs}
              setColor={setColor}
              inputRef={inputRef}
              picked={picked}
              setPicked={setPicked}
            />
          </Box>
        </Stack>

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
