import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Box, SkeletonCircle, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { songType } from './ForYou';

// {
//     artist: 'Weeknd',
//     duration: 320,
//     photo:
//       'https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg',
//     title: 'Starboy',
//     url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',
//   }

type songProps = {
  songData: {
    artist: string;
    duration: number;
    photo: string;
    title: string;
    url: string;
  };
  setPicked: React.Dispatch<React.SetStateAction<string>>;
  idx: number;
  picked: string;

  setSongs: React.Dispatch<React.SetStateAction<songType[]>>;
  songs: songType[];
  page: number;
};

const songTime = (time: number) => {
  return `${Math.floor(time / 60)}:${time % 60}`;
};

// const getInitials = (title: string) => {
//   const words = title.split(' ');
//   const ret: string[] = [];
//   words.forEach((w) => ret.push(w[0].toUpperCase()));
//   return ret.join();
// };

const SongCard: React.FC<songProps> = ({
  songData,
  setPicked,
  picked,
  idx,

  setSongs,
  songs,
  page,
}) => {
  const clicked = () => {
    // console.log(picked, idx);
    setPicked(`${String(idx)} ${String(page)}`);

    setSongs(songs);
  };

  const [active, setActive] = useState(false);

  // console.log(picked, idx);
  useEffect(() => {
    const split = picked.split(' ');
    setActive(+split[0] === idx && +split[1] === page);
  }, [picked, idx, page]);

  return (
    <>
      <Box
        position={'relative'}
        // overflowX={'hidden'}
      >
        <button
          className={`w-[28vw]  ${
            active ? 'bg-neutral-600' : 'bg-transparent'
          }  ${
            active ? 'bg-opacity-75 ' : 'bg-opacity-100'
          } hover:bg-neutral-500 hover:bg-opacity-75 rounded-lg flex align-middle`}
          onClick={clicked}
        >
          <Stack direction={'row'} spacing={4}>
            <Avatar className="w-10 h-10  md:w-12 md:h-12 sm:mt-4 flex  mt-3 ml-2 align-middle">
              <AvatarImage src={songData.photo} />
              <AvatarFallback>
                <SkeletonCircle
                  className=" -mt-1  neutral-500 bg-opacity-75 "
                  size={'12'}
                  // bg-slate-900/10
                />
              </AvatarFallback>
            </Avatar>
            <Box
              // bg={'green.200'}
              // className=" md:max-w-[14vw] lg:max-w-[18vw] "
              maxW={'16vw'}
              textOverflow={'ellipsis'}
            >
              <Stack spacing={1.25} className="mt-[1.25rem]" mb={4}>
                <Text
                  className=" text-left text-md text-white text-opacity-80 font-semibold leading-none truncate"
                  fontSize={'medium'}
                >
                  {songData.title}
                </Text>
                <Text
                  className="text-left text-sm text-white text-opacity-40 truncate"
                  fontSize={'small'}
                >
                  {songData.artist}
                </Text>
              </Stack>
            </Box>
            <Text
              position={'absolute'}
              right={'2vw'}
              fontSize={''}
              display={{ base: 'none', lg: 'block' }}
              className=" text-white text-opacity-70 mt-6"
            >
              {songTime(songData.duration)}
            </Text>
          </Stack>
        </button>
      </Box>
    </>
  );
};

export default SongCard;
