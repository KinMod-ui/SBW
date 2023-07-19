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
import { Link, useLocation } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';

// type props = {};

const Sidebar = () => {
  const Names = ['For You', 'Top Tracks', 'Favourites', 'Recently Played'];
  const links = ['', 'Top Tracks', 'Favourites', 'Recently Played'];
  // const [selected, setSelected] = useState(-1);
  let selected = -1;
  // const { page } = useParams();
  // links.forEach((n) =>
  //   console.log(n.replace(/\s/g, '').toLowerCase(), location.pathname.slice(1))
  // );

  const location = useLocation();
  // console.log(location);
  // useEffect(() => {
  // }, [history.location.pathname]);
  const idx = links.findIndex(
    (n) => n.replace(/\s/g, '').toLowerCase() === location.pathname.slice(1)
  );
  if (idx >= 0 && idx <= 3) selected = idx;
  // console.log(idx, location.pathname);

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
                display={{ base: 'none', lg: 'block' }}
                // className={'hidden lg:block'}
              >
                Spotify
              </Text>
              <Text
                textColor={'whiteAlpha.900'}
                pt={2}
                fontSize={'x-small'}
                ml={'-1'}
                display={{ base: 'none', lg: 'block' }}
                // className={'hidden lg:block'}
              >
                ®
              </Text>
            </Stack>
            <Box
              display={{ base: 'none', md: 'block' }}
              // className={'hidden md:block'}
            >
              <Stack
                direction={{ base: 'row', md: 'column' }}
                className=" md:pt-6 mx-1 md:mx-4"
                spacing={{ base: 2, md: 5 }}
                w={{ base: '80vw' }}
                justifyContent={'space-between'}
              >
                <button className="rounded-sm justify-start whitespace-nowrap text-left  w-fit ">
                  <Text
                    textColor={`${
                      selected === 0 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                    }`}
                    // fontSize={{ base: 'xs', md: 'medium' }}
                  >
                    <Link to={'/'}>{Names[0]}</Link>
                  </Text>
                </button>
                <button className="rounded-sm whitespace-nowrap text-left  w-fit ">
                  <Text
                    textColor={`${
                      selected === 1 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                    }`}
                    // fontSize={{ base: 'xs', md: 'medium' }}
                  >
                    <Link to={'/toptracks'}>{Names[1]}</Link>
                  </Text>
                </button>
                <button className=" rounded-sm whitespace-nowrap text-left  w-fit ">
                  <Text
                    textColor={`${
                      selected === 2 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                    }`}
                    // fontSize={{ base: 'xs', md: 'medium' }}
                  >
                    <Link to={'/favourites'}>{Names[2]}</Link>
                  </Text>
                </button>
                <button className="rounded-sm whitespace-nowrap text-left  w-fit ">
                  <Text
                    textColor={`${
                      selected === 3 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                    }`}
                    // fontSize={{ base: 'xs', md: 'medium' }}
                  >
                    <Link to={'/recentlyplayed'}>{Names[3]}</Link>
                  </Text>
                </button>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box
          display={{ base: 'block', md: 'none' }}
          className="absolute right-6 "
        >
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
                <MenuList
                  zIndex={'sticky'}
                  className="relative bg-black w-30 rounded-lg"
                >
                  <Link to={'/'}>
                    <MenuItem className="mt-1 text-lg font-bold rounded-sm   justify-start whitespace-nowrap text-left pl-2 pr-2">
                      <Text
                        textColor={`${
                          selected === 0 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                        }`}
                        className=""
                        // fontSize={{ base: 'xs', md: 'medium' }}
                      >
                        {Names[0]}
                      </Text>
                    </MenuItem>
                  </Link>
                  <Link to={'/toptracks'}>
                    <MenuItem className="mt-1 w-full text-lg font-bold rounded-sm   justify-start whitespace-nowrap text-center  pl-2">
                      <Text
                        textColor={`${
                          selected === 1 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                        }`}
                        className=""
                        // fontSize={{ base: 'xs', md: 'medium' }}
                      >
                        {Names[1]}
                      </Text>
                      {/* </Button> */}
                    </MenuItem>
                  </Link>
                  <Link to={'/favourites'}>
                    <MenuItem className="mt-1 w-full text-lg font-bold rounded-sm   justify-start whitespace-nowrap text-left  pl-2">
                      <Text
                        textColor={`${
                          selected === 2 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                        }`}
                        className=""
                        // fontSize={{ base: 'xs', md: 'medium' }}
                      >
                        {Names[2]}
                      </Text>
                    </MenuItem>
                  </Link>
                  <MenuItem className="mt-1 w-full text-lg font-bold  rounded-sm   justify-start whitespace-nowrap text-left  pl-1.5 pr-2 ">
                    <Text
                      textColor={`${
                        selected === 3 ? 'whiteAlpha.900' : 'whiteAlpha.600'
                      }`}
                      className=""
                      // fontSize={{ base: 'xs', md: 'medium' }}
                    >
                      <Link to={'/recentlyPlayed'}>{Names[3]}</Link>
                    </Text>
                  </MenuItem>
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
