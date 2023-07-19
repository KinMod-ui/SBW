import {
  Box,
  IconButton,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { songType } from './ForYou';
import { useEffect, useRef, useState } from 'react';

import { FaForward, FaBackward, FaPause, FaPlay } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { HiSpeakerWave } from 'react-icons/hi2';
import { MdGraphicEq } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import ColorThief from 'colorthief';

import { colorState } from '../App';

type props = {
  song?: songType;
  songs?: songType[];
  picked: string;
  setColor: React.Dispatch<React.SetStateAction<colorState>>;
  setPicked: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement> | undefined;
};

const MusicPlayer: React.FC<props> = ({
  song,
  songs,
  picked,
  setColor,
  setPicked,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [_, setCurrentTime] = useState(0);
  const [value, setValue] = useState('');
  const [imageError, setImageError] = useState(false);

  const audioComponent = useRef<HTMLAudioElement>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  // const [dominantColor, setDominantColor] = useState('transparent');

  useEffect(() => {
    if (songs && picked !== '-1') {
      const colorThief = new ColorThief();
      const img = imageRef.current;

      if (img) {
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const colors = colorThief.getColor(img);
          const hexColor = `#${colors
            .map((color) => color.toString(16).padStart(2, '0'))
            .join('')}`;

          // setDominantColor(hexColor);
          setColor({ color: hexColor });
        };
      }
      // const image = document.createElement('img');
      // image.crossOrigin = 'Anonymous'; // Enable CORS for the image
      // image.src = songs[picked].url;

      // image.onload = () => {
      //   const colorThief = new ColorThief();
      //   const colors = colorThief.getColor(image);

      //   // Convert RGB color to hexadecimal string
      //   const hexColor = `#${colors
      //     .map((color) => color.toString(16).padStart(2, '0'))
      //     .join('')}`;

      //   setDominantColor(hexColor);
      // };
    }
  }, [picked, songs, setColor]);

  const songDuration = useRef(0); // Total duration of the song in seconds
  const interval = useRef(100);

  useEffect(() => {
    if (audioComponent.current) {
      songDuration.current = audioComponent.current.duration;
      interval.current = Math.floor(songDuration.current / 100) + 1;
    }
    // if (progressBar.current)
    // progressBar.current.max=song.duration
  }, [
    audioComponent?.current?.readyState,
    audioComponent?.current?.onloadedmetadata,
  ]);

  const togglePlayPause = (play?: boolean) => {
    const updateSliderValue = () => {
      if (audioComponent.current) {
        setValue(
          String(
            Math.floor(
              (audioComponent.current.currentTime * 100) /
                audioComponent.current.duration
            )
          )
        );
        if (
          Math.floor(
            (audioComponent.current.currentTime * 100) /
              audioComponent.current.duration
          ) === 100
        ) {
          handleNextSong(1);
        }
      }
    };
    // console.log(isPlaying);
    const prevValue = isPlaying;

    let updateSliderInterval: NodeJS.Timeout | undefined = undefined;

    if (play) {
      setIsPlaying(play);
    } else {
      setIsPlaying(!prevValue);
    }
    if (!prevValue || play) {
      void audioComponent.current?.play();
      updateSliderInterval = setInterval(updateSliderValue, interval.current);
    } else {
      audioComponent.current?.pause();
      // cancelAnimationFrame(animationRef.current);
      if (updateSliderInterval !== undefined)
        clearInterval(updateSliderInterval);
    }
  };

  useEffect(() => {
    // console.log(picked, song, songs);
    if (
      picked !== '-1' &&
      songs !== undefined &&
      songs.length !== 0 &&
      audioComponent.current !== null
    ) {
      const idx = picked.split(' ');
      audioComponent.current.src = songs[+idx[0]].url;
      togglePlayPause(true);
    }
    // setIsPlaying(true)
  }, [picked]);

  // useEffect(() => {
  //   setIsPlaying(false);
  // }, []);

  // useEffect(() => {
  //   console.log(songs);
  //   if (
  //     picked !== -1 &&
  //     songs !== undefined &&
  //     songs.length !== 0 &&
  //     audioComponent.current !== null
  //   ) {
  //     audioComponent.current.src = songs[picked].url;
  //     togglePlayPause(false);
  //   }
  //   setPicked(-1);
  //   // setIsPlaying(true)
  // }, [songs]);

  // if (value === 100) {
  //   setIsPlaying(false);
  // }

  const currentTimeChange = (v: number) => {
    // setCurrentTime(v);
    if (audioComponent.current)
      audioComponent.current.currentTime = Math.floor(
        (v * audioComponent.current.duration) / 100
      );
  };

  const handleImageError = () => {
    // Image failed to load, set the error state to true
    setImageError(true);
  };

  // console.log(picked >= 0 ? songs[picked].photo : -1);

  const handleNextSong = (dif: number) => {
    if (songs) {
      const currSong: string[] = picked.split(' ');
      if (currSong.length <= 1) return;
      let nextSong = -1;
      if (dif === 1) {
        nextSong = (+currSong[0] + 1) % songs.length;
      } else {
        nextSong = (+currSong[0] - 1 + songs.length) % songs.length;
      }
      setPicked(String(nextSong) + currSong[1]);
    }
  };

  return (
    <>
      {
        <Box className="relative" mr={'5vw'}>
          <Stack
            className="ml-[20.25vw] md:ml-[6.5vw]"
            mt={{ base: '10vh', md: '11vh' }}
            spacing={1}
          >
            <Text
              textColor={'whiteAlpha.900'}
              fontWeight={'extrabold'}
              fontSize={'4xl'}
              className="truncate text-center md:text-left"
            >
              {song?.title || ''}
            </Text>
            <Text
              // textColor={'whiteAlpha.900'}
              fontSize={'medium'}
              className="text-center md:text-left  text-opacity-60 text-white truncate"
            >
              {song?.artist || ''}
            </Text>
            {!imageError ? (
              <Image
                mt={'2vh'}
                ref={imageRef}
                className={'max-h-[50vh] min-w-[25vw] '}
                // className={'  shadow-lg rounded-lg'}
                src={song?.photo || '/vinyl.png'}
                onError={handleImageError}
              ></Image>
            ) : (
              <Image
                mt={'2vh'}
                ref={imageRef}
                className={'max-h-[50vh] min-w-[25vw] '}
                // className={'  shadow-lg rounded-lg'}
                src={'/vinyl.png'}
                onError={handleImageError}
              ></Image>
            )}
            <audio ref={audioComponent} src={song?.url} preload="metadata" />
            <Stack spacing={1}>
              <Box className="mt-[2vh]">
                <Slider
                  aria-label="slider-ex"
                  defaultValue={0}
                  // onChangeEnd={(v) => currentTimeChange(v)}
                  onChange={(v) => currentTimeChange(v)}
                  // ref={progressBar}
                  className="border-none"
                  value={value !== 'NaN' ? +value % 100 : 0}
                  focusThumbOnChange={false}
                  isDisabled={picked === '-1'}
                  // width="300px"
                  // className="w-10"
                  // paddingLeft={0}
                >
                  <SliderTrack
                    borderRadius={'md'}
                    boxSize={'2'}
                    border={'none'}
                  >
                    <SliderFilledTrack bgColor={'#6badce'} border={'none'} />
                  </SliderTrack>
                  <SliderThumb boxSize={6} border={'none'}>
                    {/* <Box color="tomato" as={MdGraphicEq} background={'none'} /> */}
                  </SliderThumb>
                </Slider>
                {/* <input type="range" className="w-[33vw]  bg-[#6badce]" /> */}
              </Box>
              <Stack
                direction={'row'}
                spacing={'0'}
                justifyContent="space-between"
                className={'mt-[.5vh] '}
              >
                <IconButton
                  variant={'link'}
                  // minW={'0vw'}
                  borderRadius={'full'}
                  height={{
                    base: '2.5rem',
                    sm: '3rem',
                    md: '3rem',
                    lg: '3.5rem',
                  }}
                  minWidth={{
                    base: '2.5rem',
                    sm: '3rem',
                    md: '3rem',
                    lg: '3.5rem',
                  }}
                  isDisabled={picked === '-1'}
                  // width={'3.5rem'}
                  className="rounded-full  bg-[#1e1d1b] flex justify-center align-middle"
                  aria-label="settings"
                  icon={
                    <BsThreeDots
                      color={'white'}
                      // className={
                      //   'flex  justify-center align-middle text-xs  sm:ml-2 sm:text-base md:ml-2.5  md:text-xl  lg:text-2xl lg:ml-3'
                      // }
                      className={
                        ' h-5 w-5   sm:h-5 sm:w-5   md:text-xl  lg:text-2xl '
                      }
                    />
                  }
                ></IconButton>

                <Stack direction={'row'} spacing={'1.75vw'}>
                  {/* <Box> */}
                  <IconButton
                    variant={'link'}
                    color={'white'}
                    minW={'4vw'}
                    className="w-3 h-3  opacity-70 "
                    aria-label="previous song"
                    isDisabled={picked === '-1'}
                    onClick={() => handleNextSong(-1)}
                    icon={
                      <FaBackward
                        // stroke-width={2}
                        className={
                          ' text-lg  sm:text-lg  md:text-xl lg:text-2xl'
                        }
                      />
                    }
                  />
                  {/* </Box> */}
                  {/* <Box mt={-1}> */}
                  <IconButton
                    aria-label="pause/play"
                    variant={'ghost'}
                    height={{
                      base: '2.5rem',
                      sm: '3rem',
                      md: '3rem',
                      lg: '3.5rem',
                    }}
                    minWidth={{
                      base: '2.5rem',
                      sm: '3rem',
                      md: '3rem',
                      lg: '3.5rem',
                    }}
                    className=" border-none   bg-white  disabled:bg-transparent disabled:text-white"
                    isDisabled={picked === '-1'}
                    borderRadius="full"
                    onClick={() => togglePlayPause()}
                    icon={
                      !isPlaying || (value !== 'NaN' && +value === 100) ? (
                        <FaPlay
                          className={
                            'ml-[.5vw]  border-none h-[1.125rem] w-[1.125rem]   sm:h-4 sm:w-4  md:h-6 md:w-6 l lg:h-8 lg:w-6'
                          }
                          // size={'1.5em'}
                        />
                      ) : (
                        <FaPause
                          // size={'1.5em'}
                          // className={
                          //   'border-none h-2 w-2  sm:-mt-4 sm:h-4 sm:w-4 md:ml-3 md:-mt-4 md:h-6 md:w-6 lg:ml-4 lg:-mt-[1em] lg:h-8 lg:w-6'
                          // }
                          className={
                            'border-none h-[1.125rem] w-[1.125rem]   sm:h-4 sm:w-4  md:h-6 md:w-6 lg:h-8 lg:w-6'
                          }
                        />
                      )
                    }
                  ></IconButton>
                  {/* </Box> */}
                  {/* <Box> */}
                  <IconButton
                    variant={'link'}
                    color={'white'}
                    minW={'4vw'}
                    className="w-3 h-3  opacity-70 "
                    aria-label="previous song"
                    isDisabled={picked === '-1'}
                    onClick={() => handleNextSong(1)}
                    icon={
                      <FaForward
                        // stroke-width={2}
                        className={
                          ' text-lg  sm:text-lg  md:text-xl lg:text-2xl'
                        }
                      />
                    }
                  />
                  {/* </Box> */}
                </Stack>

                <Popover trigger="hover" placement="top" strategy="fixed">
                  <PopoverTrigger>
                    <IconButton
                      variant={'link'}
                      // minW={'0vw'}
                      borderRadius={'full'}
                      height={{
                        base: '2.5rem',
                        sm: '3rem',
                        md: '3rem',
                        lg: '3.5rem',
                      }}
                      minWidth={{
                        base: '2.5rem',
                        sm: '3rem',
                        md: '3rem',
                        lg: '3.5rem',
                      }}
                      isDisabled={picked === '-1'}
                      // width={'3.5rem'}
                      className=" rounded-full  bg-[#1e1d1b] flex justify-center align-middle"
                      aria-label="settings"
                      icon={
                        <HiSpeakerWave
                          // height={{
                          //   base: '1rem',
                          //   sm: '2.5rem',
                          //   md: '2.5rem',
                          //   lg: '3.5rem',
                          // }}
                          // width={{
                          //   base: '1rem',
                          //   sm: '2rem',
                          //   md: '2.5rem',
                          //   lg: '3.5rem',
                          // }}
                          color={'white'}
                          // className={
                          //   'flex  justify-center align-middle text-xs  sm:ml-2 sm:text-base md:ml-2.5  md:text-xl  lg:text-2xl lg:ml-3'
                          // }
                          className={
                            ' h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 '
                          }
                        />
                      }
                    ></IconButton>
                  </PopoverTrigger>
                  <PopoverContent
                    bg={'slate-700'}
                    borderColor={'slate-700'}
                    // minWidth={2}
                    width={0}
                    border={'none'}
                  >
                    <Slider
                      aria-label="slider-ex"
                      defaultValue={30}
                      orientation="vertical"
                      h={'36'}
                      // width="300px"
                      // className="w-10"
                      // paddingLeft={0}
                    >
                      <SliderTrack borderRadius={'md'} boxSize={'3'}>
                        <SliderFilledTrack bgColor={'#6badce'} />
                      </SliderTrack>
                      <SliderThumb boxSize={6}>
                        <Box
                          color="tomato"
                          as={MdGraphicEq}
                          background={'none'}
                        />
                      </SliderThumb>
                    </Slider>
                  </PopoverContent>
                </Popover>
                {/* </Box> */}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      }
    </>
  );
};

export default MusicPlayer;
