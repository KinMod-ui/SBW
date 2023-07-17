import { Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { colorState } from '../App';

type props = {
  color: string;
};

const TopTracks: React.FC<props> = ({ color }) => {
  return (
    <>
      <Box h="100vh" w={'50vw'} bg={color} pt={8}>
        <Sidebar selected={1}></Sidebar>
      </Box>
    </>
  );
};

export default TopTracks;
