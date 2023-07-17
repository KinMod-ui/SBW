import {
  Box,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { songType } from './ForYou';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { FaForward, FaBackward, FaPause, FaPlay } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { HiSpeakerWave } from 'react-icons/hi2';
import { MdGraphicEq } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import ColorThief from 'colorthief';
import img from 'react-image';
import { colorState } from '../App';

type props = {
  song?: songType;
  songs?: songType[];
  picked: number;
  setColor: React.Dispatch<React.SetStateAction<colorState>>;
  inputRef: React.RefObject<HTMLInputElement>;
};

const MusicPlayer: React.FC<props> = ({
  song,
  songs,
  picked,
  setColor,
  inputRef,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [value, setValue] = useState('');

  const audioComponent = useRef<HTMLAudioElement>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  const [dominantColor, setDominantColor] = useState('transparent');

  useEffect(() => {
    if (songs && picked >= 0) {
      const colorThief = new ColorThief();
      const img = imageRef.current;

      if (img) {
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const colors = colorThief.getColor(img);
          const hexColor = `#${colors
            .map((color) => color.toString(16).padStart(2, '0'))
            .join('')}`;

          setDominantColor(hexColor);
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
      if (audioComponent.current)
        setValue(
          String(
            Math.floor(
              (audioComponent.current.currentTime * 100) /
                audioComponent.current.duration
            )
          )
        );

      if (inputRef) {
        inputRef.current?.focus();
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
    if (picked !== -1 && audioComponent.current && songs) {
      audioComponent.current.src = songs[picked].url;
      togglePlayPause(true);
    }
    // setIsPlaying(true)
  }, [picked, songs]);

  if (!song || !songs) {
    return <></>;
  }

  // if (value === 100) {
  //   setIsPlaying(false);
  // }

  const currentTimeChange = (v: number) => {
    setCurrentTime(v);
    if (audioComponent.current)
      audioComponent.current.currentTime = Math.floor(
        (v * audioComponent.current.duration) / 100
      );
  };

  return (
    <>
      {songs.length > 0 && (
        <Stack className="ml-[8vw]" mt={'11vh'} spacing={1}>
          <Box maxWidth={'33vw'} className="relative">
            <Text
              textColor={'whiteAlpha.900'}
              fontWeight={'extrabold'}
              fontSize={'4xl'}
            >
              {song.title}
            </Text>
            <Text
              // textColor={'whiteAlpha.900'}
              fontSize={'medium'}
              className="text-opacity-60 text-white"
            >
              {song.artist}
            </Text>
            <Image
              mt={'2vh'}
              ref={imageRef}
              // className={'lg:min-w-[33vw] md:min-w-[33vw] max-h-[45vh]'}
              className={'lg:h-[45vh] lg:w-[33vw]'}
              src={song.photo}
            ></Image>
            <audio ref={audioComponent} src={song.url} preload="metadata" />
            <Stack>
              <Box className="mt-5">
                <Slider
                  aria-label="slider-ex"
                  defaultValue={0}
                  // onChangeEnd={(v) => currentTimeChange(v)}
                  onChange={(v) => currentTimeChange(v)}
                  // ref={progressBar}
                  className="border-none"
                  value={value !== 'NaN' ? +value % 100 : 0}
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
                spacing={0}
                justifyContent="space-between"
                className={'mt-4'}
              >
                <button className="w-2 h-2 bg-transparent  sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full sm:bg-[#1e1f22] relative ">
                  <BsThreeDots
                    color={'white'}
                    className={
                      'flex  justify-center align-middle text-xs mt-1.5 sm:mt-0 sm:ml-2 sm:text-base md:ml-2.5  md:text-xl  lg:text-2xl lg:ml-3'
                    }
                  />
                </button>

                <Stack direction={'row'} spacing={0}>
                  <Box>
                    <Button
                      variant={'link'}
                      className="text-xl  text-white opacity-60 -mt-6 sm:-mt-0.5  md:mt-1 lg:mt-2 "
                    >
                      <FaBackward
                        className={
                          'text-xs    sm:text-lg  md:text-xl lg:text-2xl'
                        }
                      />
                    </Button>
                  </Box>
                  <Box mt={-1}>
                    <button
                      className="w-6 h-6 mt-1 sm:mt-0 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-none rounded-full bg-white   pt-[1em]"
                      onClick={() => togglePlayPause()}
                    >
                      {!isPlaying || (value !== 'NaN' && +value === 100) ? (
                        <FaPlay
                          className={
                            'relative left-[0.0125em] sm:left-0.5 border-none  h-3 w-2 ml-2 -mt-3 sm:ml-3 sm:-mt-4 sm:h-4 sm:w-4 md:ml-3 md:-mt-4 md:h-6 md:w-6 lg:ml-4 lg:-mt-[1em] lg:h-8 lg:w-6'
                          }
                          // size={'1.5em'}
                        />
                      ) : (
                        <FaPause
                          // size={'1.5em'}
                          className={
                            'border-none h-2 w-2 ml-2 -mt-3 sm:ml-3 sm:-mt-4 sm:h-4 sm:w-4 md:ml-3 md:-mt-4 md:h-6 md:w-6 lg:ml-4 lg:-mt-[1em] lg:h-8 lg:w-6'
                          }
                        />
                      )}
                    </button>
                  </Box>
                  <Box>
                    <Button
                      variant={'link'}
                      className=" text-xl  text-white opacity-60 -mt-6 sm:-mt-0.5  md:mt-1 lg:mt-2 "
                    >
                      <FaForward
                        className={
                          'text-xs    sm:text-lg  md:text-xl lg:text-2xl'
                        }
                      />
                    </Button>
                  </Box>
                </Stack>

                <Popover trigger="hover">
                  <PopoverTrigger>
                    <button className="w-2 h-2 bg-transparent  sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full sm:bg-[#1e1f22] relative ">
                      <HiSpeakerWave
                        className={
                          'flex justify-center align-middle text-xs mt-1 sm:mt-0 sm:ml-2 sm:text-base md:ml-2.5  md:text-xl  lg:text-2xl lg:ml-3'
                        }
                        // size={'1.25em'}
                        // left={'1em'}
                        color={'white'}
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    bg={'slate-700'}
                    borderColor={'slate-700'}
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
          </Box>
        </Stack>
      )}
    </>
  );
};

export default MusicPlayer;
