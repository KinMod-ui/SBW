import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';

import { AvatarPage } from './Avatar';
import { Link } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';

// type props = {};

const Sidebar = () => {
  const Names = ['For You', 'Top Tracks', 'Favourites', 'Recently Played'];
  const [selected, setSelected] = useState(-1);

  // const callSelect = (num: number) => {
  //   setIsSelected(num);
  // };

  return (
    <>
      <Stack
        direction={'row'}
        spacing={0}
        mt={8}
        w={{ base: '100vw', md: 'auto' }}
      >
        <Box w={{ base: '100vw', md: '20vw' }}>
          <Stack
            spacing={{ base: -2, md: 2 }}
            className="mx-1"
            direction={{ base: 'row', md: 'column' }}
          >
            <Stack
              className="ml-6 md:mx-4   md:mt-0  md:w-auto md:h-auto"
              direction={'row'}
            >
              <Image
                // mt={'2'}
                // width={'10'}
                // height={'10'}
                src={'spotify.png'}
              ></Image>
              <Text
                textColor={'whiteAlpha.900'}
                fontSize={'3xl'}
                fontWeight={'bold'}
                className={'hidden lg:block'}
              >
                Spotify
              </Text>
              <Text
                textColor={'whiteAlpha.900'}
                pt={2}
                fontSize={'x-small'}
                ml={'-1'}
                className={'hidden lg:block'}
              >
                ®
              </Text>
            </Stack>
            <Box className={'hidden md:block'}>
              <Stack
                direction={{ base: 'row', md: 'column' }}
                className=" md:pt-6 mx-1 md:mx-4"
                spacing={{ base: 2, md: 5 }}
                w={{ base: '80vw' }}
                justifyContent={'space-between'}
              >
                <button
                  onClick={() => setSelected(0)}
                  className="rounded-sm justify-start whitespace-nowrap text-left  w-fit "
                >
                  <Text
                    textColor={`${
                      selected === 0 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                    }`}
                    // fontSize={{ base: 'xs', md: 'medium' }}
                  >
                    <Link to={'/'}>{Names[0]}</Link>
                  </Text>
                </button>
                <button
                  onClick={() => setSelected(1)}
                  className="rounded-sm whitespace-nowrap text-left  w-fit "
                >
                  <Text
                    textColor={`${
                      selected === 1 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                    }`}
                    // fontSize={{ base: 'xs', md: 'medium' }}
                  >
                    <Link to={'/toptracks'}>{Names[1]}</Link>
                  </Text>
                </button>
                <button
                  onClick={() => setSelected(2)}
                  className=" rounded-sm whitespace-nowrap text-left  w-fit "
                >
                  <Text
                    textColor={`${
                      selected === 2 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                    }`}
                    // fontSize={{ base: 'xs', md: 'medium' }}
                  >
                    <Link to={'/favourites'}>{Names[2]}</Link>
                  </Text>
                </button>
                <button
                  onClick={() => setSelected(3)}
                  className="rounded-sm whitespace-nowrap text-left  w-fit "
                >
                  <Text
                    textColor={`${
                      selected === 3 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                    }`}
                    // fontSize={{ base: 'xs', md: 'medium' }}
                  >
                    <Link to={'/recentlyPlayed'}>{Names[3]}</Link>
                  </Text>
                </button>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box className="absolute right-6 ">
          <Menu
            closeOnBlur={true}
            styleConfig={{ background: 'black' }}
            autoSelect={false}
          >
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  // rightIcon={<ChevronDownIcon />}
                  className="bg-white"
                >
                  {!isOpen ? <HiMenu /> : <RxCross2 />}
                </MenuButton>
                <MenuList className="bg-black">
                  <MenuItem>
                    <Button
                      onClick={() => setSelected(0)}
                      variant={'ghost'}
                      className="rounded-sm hover:bg-white hover:text-black focus:bg-white focus:text-black  justify-start whitespace-nowrap text-left  w-fit "
                    >
                      <Text
                        textColor={`${
                          selected === 0 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                        }`}

                        // fontSize={{ base: 'xs', md: 'medium' }}
                      >
                        <Link to={'/'}>{Names[0]}</Link>
                      </Text>
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => setSelected(1)}
                      variant={'ghost'}
                      className="rounded-sm hover:bg-white hover:text-black focus:bg-white focus:text-black  justify-start whitespace-nowrap text-left  w-fit "
                    >
                      <Text
                        textColor={`${
                          selected === 1 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                        }`}
                        // fontSize={{ base: 'xs', md: 'medium' }}
                      >
                        <Link to={'/toptracks'}>{Names[1]}</Link>
                      </Text>
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => setSelected(2)}
                      variant={'ghost'}
                      className="rounded-sm hover:bg-white hover:text-black focus:bg-white focus:text-black  justify-start whitespace-nowrap text-left  w-fit "
                    >
                      <Text
                        textColor={`${
                          selected === 2 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                        }`}
                        // fontSize={{ base: 'xs', md: 'medium' }}
                      >
                        <Link to={'/favourites'}>{Names[2]}</Link>
                      </Text>
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => setSelected(3)}
                      variant={'ghost'}
                      className="rounded-sm hover:bg-white hover:text-black focus:bg-white focus:text-black  justify-start whitespace-nowrap text-left  w-fit "
                    >
                      <Text
                        textColor={`${
                          selected === 3 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                        }`}
                        // fontSize={{ base: 'xs', md: 'medium' }}
                      >
                        <Link to={'/recentlyPlayed'}>{Names[3]}</Link>
                      </Text>
                    </Button>
                  </MenuItem>

                  {/* <MenuItem onClick={() => alert('Kagebunshin')}>
                    Create a Copy
                  </MenuItem> */}
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
        <Box className="absolute left-7 bottom-4">
          <AvatarPage />
        </Box>
      </Stack>
    </>
  );
};

export default Sidebar;
