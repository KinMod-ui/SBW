import { Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { colorState } from '../App';

type props = {
  color: string;
};

const RecentlyPlayed: React.FC<props> = ({ color }) => {
  return (
    <Box h="100vh" w={'50vw'} bg="#1D1407" pt={8}>
      <Sidebar selected={3} />
    </Box>
  );
};

export default RecentlyPlayed;
