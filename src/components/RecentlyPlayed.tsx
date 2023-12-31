import { Box, Skeleton, SkeletonCircle, Stack, Text } from '@chakra-ui/react';
import SearchBar from './SearchBar';
import SongCard from './SongCard';
import { useEffect, useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import SongCardForMenu from './SongCardForMenu';
import { shadeColor } from '../shadeColor';
import SearchBarForMenu from './SearchBarForMenu';
import { songType } from './ForYou';

type props = {
  color: string;
  setSongs: React.Dispatch<React.SetStateAction<songType[]>>;
  setPicked: React.Dispatch<React.SetStateAction<string>>;

  picked: string;
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

type specialType = {
  getSongs: Array<songType>;
};

const RecentlyPlayed: React.FC<props> = ({
  color,
  setSongs,
  setPicked,
  picked,
}) => {
  const { loading, error, data } = useQuery(queryGetALlSongs, {
    variables: { playlistId: 4 },
  });
  const [searchInput, setSearchInput] = useState('');
  const [closeMenu, setCloseMenu] = useState(true);

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
    // console.log('clicked', clicked);
    const idx = picked.split(' ');
    if (+idx[1] === 4) {
      setSongs((prev) => (prev !== songs ? songs : prev));
      // setClicked(false);
    }
  }, [picked, songs, setSongs]);

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
      <Text
        display={{ base: 'block', md: 'none' }}
        className="absolute "
        textColor={'whiteAlpha.900'}
        fontWeight={'extrabold'}
        fontSize={'2xl'}
        letterSpacing={'tight'}
        top={10}
        // bg={'green.100'}

        left={'22vw'}
        w={'57vw'}
        textAlign={'center'}
      >
        Recently Played
      </Text>
      <Box
        h="100vh"
        w={'30vw'}
        pt={8}
        display={{ base: 'none', md: 'block' }}
        className={' overflow-x-visible'}
      >
        <Stack h={'95vh'}>
          <Text
            textColor={'whiteAlpha.900'}
            fontWeight={'extrabold'}
            fontSize={'3xl'}
            letterSpacing={'tight'}
          >
            Recently Played
          </Text>

          <SearchBar color={color} setSearchInput={setSearchInput} />
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
                    page={4}
                    songs={songs}
                    setSongs={setSongs}
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

      <Box
        // h="100vh"
        // w={'30vw'}

        // mt={8}
        display={{ base: 'flex', md: 'none' }}
        className={' align-middle ml-[12vw] max-w-full max-h-full'}
      >
        <Dialog
          open={!closeMenu}
          onOpenChange={() => {
            // console.log('hehehe', closeMenu);
            setCloseMenu((prev) => !prev);
            // console.log('hehehe', closeMenu);
          }}
        >
          <DialogTrigger asChild>
            {/* <Box bg="green.200"> */}
            <Button
              variant="ghost"
              className=" bg-[#0f121a] hover:bg-[#212325]"
            >
              <Text textColor={'whiteAlpha.900'}>Get All Songs 🎵</Text>
            </Button>
            {/* </Box> */}
          </DialogTrigger>
          <DialogContent
            style={{ backgroundColor: `${shadeColor(color, -50)} ` }}
            className={`sm:max-w-[425px] rounded-lg z-50`}
          >
            <DialogHeader>
              <DialogTitle>
                <SearchBarForMenu
                  color={color}
                  setSearchInput={setSearchInput}
                />
              </DialogTitle>
            </DialogHeader>
            <Box className="h-[30vh] overflow-y-scroll scrollbar">
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
                    <SongCardForMenu
                      key={idx}
                      page={4}
                      songs={songs}
                      setSongs={setSongs}
                      songData={s}
                      setPicked={setPicked}
                      idx={idx}
                      picked={picked}
                      setCloseMenu={setCloseMenu}
                    />
                  );
                })
              )}
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Stack>
  );
};

export default RecentlyPlayed;
