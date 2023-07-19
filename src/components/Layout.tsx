import { Stack } from '@chakra-ui/react';

type props = {
  staticComponent: JSX.Element;
  children?: JSX.Element;
};

const Layout = (props: props) => {
  // console.log(props);

  return (
    <div>
      <Stack direction={'row'} spacing={0}>
        {props.children}
        {props.staticComponent}
      </Stack>
    </div>
  );
};

export default Layout;
