import { Box } from '@chakra-ui/react';
import { Input } from '../components/ui/input';

import { useRef } from 'react';
import { shadeColor } from '../shadeColor';

type props = {
  color: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBarForMenu: React.FC<props> = ({ color, setSearchInput }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Update the component state

  //     // Check if the input reference exists and focus on it
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   }, 500);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // });

  // useEffect(() => {
  //   if (setInputRef) setInputRef(inputRef);
  // }, [inputRef, setInputRef]);

  //   console.log(`bg-[${color}]`);
  return (
    <Box className=" " w={'fit'} mt={'2vh'} key={'SearchBar'}>
      <Input
        autoFocus={false}
        className={`placeholder-neutral-200 placeholder-opacity-75 text-sm text-white text-opacity-40 tracking-wider invert-[.1] `}
        style={{ backgroundColor: `${shadeColor(color, -80)} ` }}
        type="email"
        ref={inputRef}
        placeholder="Search Song, Artist"
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </Box>
  );
};

export default SearchBarForMenu;
