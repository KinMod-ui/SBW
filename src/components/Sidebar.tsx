import { Box, Image, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { AvatarPage } from './Avatar';
import { Link } from 'react-router-dom';

type props = {
  selected: number;
};

const Sidebar: React.FC<props> = ({ selected }) => {
  const Names = ['For You', 'Top Tracks', 'Favourites', 'Recently Played'];

  // const callSelect = (num: number) => {
  //   setIsSelected(num);
  // };

  return (
    <>
      <Stack direction={'row'} spacing={0} mt={8}>
        <Box w={'20vw'}>
          <div className="mx-2">
            <Stack className="mx-4" direction={'row'} spacing={1}>
              <Image
                // mt={'2'}
                width={'10'}
                height={'10'}
                src={'spotify.png'}
              ></Image>
              <Text
                textColor={'whiteAlpha.900'}
                fontSize={'3xl'}
                fontWeight={'bold'}
              >
                Spotify
              </Text>
              <Text
                textColor={'whiteAlpha.900'}
                pt={2}
                fontSize={'x-small'}
                ml={'-1'}
              >
                ®
              </Text>
            </Stack>
            <Stack className="pt-6 mx-4" spacing={5}>
              <button className="rounded-sm justify-start text-left w-fit">
                <Text
                  letterSpacing={'wider'}
                  textColor={`${
                    selected === 0 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                  }`}
                >
                  <Link to={'/'}>{Names[0]}</Link>
                </Text>
              </button>
              <button className="rounded-sm text-left w-fit">
                <Text
                  letterSpacing={'wider'}
                  textColor={`${
                    selected === 1 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                  }`}
                >
                  <Link to={'/toptracks'}>{Names[1]}</Link>
                </Text>
              </button>
              <button className=" rounded-sm text-left w-fit">
                <Text
                  letterSpacing={'wider'}
                  textColor={`${
                    selected === 2 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                  }`}
                >
                  <Link to={'/favourites'}>{Names[2]}</Link>
                </Text>
              </button>
              <button className="rounded-sm justify-start text-left w-fit">
                <Text
                  letterSpacing={'wider'}
                  textColor={`${
                    selected === 3 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                  }`}
                >
                  <Link to={'/recentlyPlayed'}>{Names[3]}</Link>
                </Text>
              </button>
            </Stack>
            <Box className="fixed left-7 bottom-4">
              <AvatarPage />
            </Box>
          </div>
        </Box>
      </Stack>
    </>
  );
};

export default Sidebar;
