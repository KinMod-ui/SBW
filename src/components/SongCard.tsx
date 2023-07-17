import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Box, SkeletonCircle, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

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
  setPicked: React.Dispatch<React.SetStateAction<number>>;
  idx: number;
  picked: number;
};

const songTime = (time: number) => {
  return `${Math.floor(time / 60)}:${time % 60}`;
};

const convertToLength = (str: string) => {
  if (str.length < 30) {
    return str;
  } else {
    return `${str.slice(0, 24)}...`;
  }
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
}) => {
  const clicked = () => {
    console.log(picked, idx);
    setPicked(idx);
  };

  const [active, setActive] = useState(false);

  console.log(picked, idx);
  useEffect(() => {
    setActive(picked === idx);
  }, [picked, idx]);

  return (
    <>
      <Box
        maxW={'30vw'}
        position={'relative'}
        // overflowX={'hidden'}
        textOverflow={'ellipsis'}
      >
        <button
          className={`w-[29vw] h-[9.5vh] ${
            active ? 'bg-neutral-600' : 'bg-transparent'
          }  ${
            active ? 'bg-opacity-75 ' : 'bg-opacity-100'
          } hover:bg-neutral-500 hover:bg-opacity-75 rounded-lg `}
          onClick={clicked}
        >
          <Stack direction={'row'} spacing={4} position={'relative'}>
            <Avatar className="h-12 w-12 ml-4 mt-[.875rem]">
              <AvatarImage src={songData.photo} />
              <AvatarFallback>
                <SkeletonCircle
                  className=" -mt-1  neutral-500 bg-opacity-75 "
                  size={'12'}
                  // bg-slate-900/10
                />
              </AvatarFallback>
            </Avatar>
            <Stack spacing={1.5} className="mt-[1.125rem]" mb={4}>
              <Box
                // bg={'green.200'}
                className="hidden md:block md:max-w-[14vw] lg:max-w-[18vw]"
              >
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
              </Box>
            </Stack>
            <Text
              position={'absolute'}
              right={'4'}
              fontSize={''}
              className="text-white text-opacity-70 mt-6"
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
