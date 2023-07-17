import { Box, Skeleton, SkeletonCircle, Stack, Text } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import SongCard from './SongCard';
import { useEffect, useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

type props = {
  color: string;
  setSongs: React.Dispatch<React.SetStateAction<songType[]>>;
  setPicked: React.Dispatch<React.SetStateAction<number>>;
  setInputRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLInputElement> | undefined>
  >;
  picked: number;
};

const queryGetALlSongs = gql`
  query GetAllSongs($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      artist
      duration
      photo
      title
      url
    }
  }
`;

export type songType = {
  artist: string;
  duration: number;
  photo: string;
  title: string;
  url: string;
};

type specialType = {
  getSongs: Array<songType>;
};

const ForYou: React.FC<props> = ({
  color,
  setSongs,
  setPicked,
  setInputRef,
  picked,
}) => {
  const { loading, error, data } = useQuery(queryGetALlSongs, {
    variables: { playlistId: 1 },
  });
  const [searchInput, setSearchInput] = useState('');
  // loading = true;

  // if (true) {
  //   return ;
  // }
  if (error) {
    console.log(error);
  }

  // console.log(data.getSongs);

  const dataTyped = data as specialType;
  let songs: Array<songType> = useMemo(() => {
    return [];
  }, []);

  if (!loading && !error && dataTyped.getSongs) songs = dataTyped.getSongs;
  useEffect(() => {
    setSongs(songs);
  }, [songs, setSongs]);

  // console.log(color);
  if (!songs) {
    return <></>;
  }

  const filteredSongs =
    searchInput === ''
      ? songs
      : songs.filter(
          (song) =>
            song.artist
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(searchInput.toLowerCase().replace(/\s+/g, '')) ||
            song.title
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(searchInput.toLowerCase().replace(/\s+/g, ''))
        );
  // console.log(searchInput);
  return (
    <Stack direction={'row'} spacing={0}>
      <Box h="100vh" w={'20vw'}>
        <Sidebar selected={0} />
      </Box>
      <Box h="100vh" w={'30vw'} pt={8}>
        <Stack>
          <Text
            textColor={'whiteAlpha.900'}
            fontWeight={'extrabold'}
            fontSize={'3xl'}
            letterSpacing={'tight'}
          >
            For You
          </Text>
          <SearchBar
            color={color}
            setSearchInput={setSearchInput}
            setInputRef={setInputRef}
          />
          <Stack
            mt={6}
            spacing={1}
            height={'75vh'}
            overflowY={'scroll'}
            className="scrollbar"
            mb={8}
          >
            {loading ? (
              <>
                <Stack spacing={10} mt={4}>
                  {Array.from({ length: 4 }, (_, i) => (
                    <Box
                      className="flex items-center space-x-4 "
                      position={'relative'}
                      key={i}
                      // style={{ backgroundColor: `white` }}
                    >
                      <Stack direction={'row'}>
                        <SkeletonCircle
                          className=" -mt-1  neutral-500 bg-opacity-75 "
                          size={'12'}
                          // bg-slate-900/10
                          style={{ backgroundColor: `${color}` }}
                        />
                        <Stack>
                          <Skeleton
                            borderRadius={'lg'}
                            className="h-[2vh] w-[15vw] neutral-500 bg-opacity-75 "
                            // bg-slate-900/10
                          />
                          <Skeleton
                            borderRadius={'lg'}
                            className="h-[2vh] w-[14vw] neutral-500 bg-opacity-75 "
                          />
                        </Stack>
                        <Box>
                          <Skeleton
                            position={'absolute'}
                            borderRadius={'lg'}
                            className="mt-3 h-[2vh] w-[3vw] neutral-500 bg-opacity-75  rounded-3xl"
                            right={4}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </>
            ) : (
              filteredSongs.map((s, idx) => {
                return (
                  <SongCard
                    key={idx}
                    songData={s}
                    setPicked={setPicked}
                    idx={idx}
                    picked={picked}
                  />
                );
              })
            )}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

// const songs = [
//   {
//     artist: 'Weeknd',
//     duration: 320,
//     photo:
//       'https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg',
//     title: 'Starboy',
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
//   {
//     artist: 'Coldplay',
//     duration: 290,
//     photo: 'https://i.scdn.co/image/ab67616d0000b273f864bcdcc245f06831d17ae0',
//     title: 'Adventure of a Lifetime ',
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
//   {
//     artist: 'Imagine Dragons',
//     duration: 379,
//     photo: 'https://i.scdn.co/image/ab67616d0000b2736a6a889eef62af7b190ec713',
//     title: 'I Bet My Life',
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
//   {
//     artist: 'Bob Dylan',
//     duration: 410,
//     photo:
//       'https://media.newyorker.com/photos/59fb842e68eaa81ba8a061a2/1:1/w_3287,h_3287,c_limit/Fishman-Loving-Bob-Dylan-at-His-Lowest-Point-2.jpg',
//     title: "Ain't Gonna Grieve",
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
//   {
//     artist: 'Coldplay',
//     duration: 450,
//     photo:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScCTDI-nskC5wUkwseWIlHnsWBYtpNguiD-IB68gU2p9nrVTIIehiD1QzUuYeN_ZKC_GI&usqp=CAU',
//     title: 'Amazing Day ',
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
//   {
//     artist: 'Imagine Dragons',
//     duration: 320,
//     photo:
//       'http://a10.gaanacdn.com/images/albums/96/1525196/crop_480x480_1525196.jpg',
//     title: 'Shots',
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
//   {
//     artist: 'Coldplay',
//     duration: 415,
//     photo: 'https://i1.sndcdn.com/artworks-000084069767-om0uyb-t500x500.jpg',
//     title: 'Til Kingdom Come ',
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
//   {
//     artist: 'Bob Dylan',
//     duration: 410,
//     photo:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Joan_Baez_Bob_Dylan_crop.jpg/1200px-Joan_Baez_Bob_Dylan_crop.jpg',
//     title: "It's the Most Wonderful Time of the Year",
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
//   {
//     artist: 'The Script',
//     duration: 321,
//     photo: 'https://i.scdn.co/image/ab67616d0000b273dd8408b50f45c66139f44ce2',
//     title: 'Hall of Fame',
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
//   {
//     artist: 'Imagine Dragons',
//     duration: 280,
//     photo:
//       'https://upload.wikimedia.org/wikipedia/en/e/e0/Imagine_Dragons_-_%22Amsterdam%22_%28Promotional_single%29.jpg',
//     title: 'Amsterdam',
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
//   {
//     artist: 'Imagine Dragons',
//     duration: 560,
//     photo:
//       'https://external-preview.redd.it/SEOiJhnBbwkfSbmAHFPh8UrvpyKcRLyVbdtf5DWNtGc.jpg?auto=webp&s=8f815af3594caa6f01ef25d3da2a8b4e1a4239a6',
//     title: 'It Comes Back to You',
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   },
// ];

export default ForYou;