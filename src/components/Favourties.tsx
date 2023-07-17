import { Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';

type props = {
  color: string;
};

const Favourites: React.FC<props> = () => {
  return (
    <>
      <Box h="100vh" w={'50vw'} bg="#1D1407" pt={8}>
        <Sidebar selected={2}></Sidebar>
      </Box>
    </>
  );
};

export default Favourites;
