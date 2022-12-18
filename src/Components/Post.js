// import * as React from 'react';
// import { fetchPosts } from "../store";
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import Textarea from '@mui/joy/Textarea';
// import IconButton from '@mui/joy/IconButton';
// import Menu from '@mui/joy/Menu';
// import MenuItem from '@mui/joy/MenuItem';
// import ListItemDecorator from '@mui/joy/ListItemDecorator';
// import FormatBold from '@mui/icons-material/FormatBold';
// import FormatItalic from '@mui/icons-material/FormatItalic';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
// import Check from '@mui/icons-material/Check';
// import { styled } from '@mui/material/styles';
// import Rating, { IconContainerProps } from '@mui/material/Rating';
// import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
// import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
// import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
// import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
// import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

// const StyledRating = styled(Rating)(({ theme }) => ({
//     '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
//       color: theme.palette.action.disabled,
//     },
//   }));
  
//   const customIcons: {
//     [index: string]: {
//       icon: React.ReactElement;
//       label: string;
//     };
//   } = {
//     1: {
//       icon: <SentimentVeryDissatisfiedIcon color="error" />,
//       label: 'Very Dissatisfied',
//     },
//     2: {
//       icon: <SentimentDissatisfiedIcon color="error" />,
//       label: 'Dissatisfied',
//     },
//     3: {
//       icon: <SentimentSatisfiedIcon color="warning" />,
//       label: 'Neutral',
//     },
//     4: {
//       icon: <SentimentSatisfiedAltIcon color="success" />,
//       label: 'Satisfied',
//     },
//     5: {
//       icon: <SentimentVerySatisfiedIcon color="success" />,
//       label: 'Very Satisfied',
//     },
//   };
  
//   function IconContainer(props: IconContainerProps) {
//     const { value, ...other } = props;
//     return <span {...other}>{customIcons[value].icon}</span>;
//   }

// const Post = () =>  {
  //const { auth, posts } = useSelector((state) => state);
  // const [italic, setItalic] = React.useState(false);
  // const [fontWeight, setFontWeight] = React.useState('normal');
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // return (
  //   <div class="dash-card">
  //   <FormControl>
  //     <FormLabel>Connect With Your Team</FormLabel>
      {/* <StyledRating
      name="highlight-selected-only"
      defaultValue={2}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].label}
      highlightSelectedOnly
      /> */}
      // <Textarea
      //   placeholder="Type here…"
      //   minRows={3}
      //   endDecorator={
      //     <Box
          //   sx={{
          //     display: 'flex',
          //     gap: 'var(--Textarea-paddingBlock)',
          //     pt: 'var(--Textarea-paddingBlock)',
          //     borderTop: '1px solid',
          //     borderColor: 'divider',
          //     flex: 'auto',
          //   }}
          // >
          //   <IconButton
          //     variant="plain"
          //     color="neutral"
          //     onClick={(event) => setAnchorEl(event.currentTarget)}
          //   >
          //     <FormatBold />
          //     <KeyboardArrowDown fontSize="md" />
          //   </IconButton>
          //   <Menu
          //     anchorEl={anchorEl}
          //     open={Boolean(anchorEl)}
          //     onClose={() => setAnchorEl(null)}
          //     size="sm"
          //     placement="bottom-start"
          //     sx={{ '--List-decorator-size': '24px' }}
          //   >
          //     {['200', 'normal', 'bold'].map((weight) => (
          //       <MenuItem
          //         key={weight}
          //         selected={fontWeight === weight}
          //         onClick={() => {
          //           setFontWeight(weight);
          //           setAnchorEl(null);
          //         }}
          //         sx={{ fontWeight: weight }}
          //       >
          //         <ListItemDecorator>
          //           {fontWeight === weight && <Check fontSize="sm" />}
          //         </ListItemDecorator>
          //         {weight === '200' ? 'lighter' : weight}
          //       </MenuItem>
          //     ))}
          //   </Menu>
          //   <IconButton
          //     variant={italic ? 'soft' : 'plain'}
//               color={italic ? 'primary' : 'neutral'}
//               aria-pressed={italic}
//               onClick={() => setItalic((bool) => !bool)}
//             >
//               <FormatItalic />
//             </IconButton>
//             <Button sx={{ ml: 'auto' }}>Send</Button>
//           </Box>
//         }
//         sx={{
//           minWidth: 300,
//           fontWeight,
//           fontStyle: italic ? 'italic' : 'initial',
//         }}
//       />
//     </FormControl>
//     </div>
//   );
// }

//export default Post



//////////////////TEST

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material';

const Post = () => {
  return (
    <div>
      <Box component="span" sx={{ p: 2, border: '1px solid grey' }}>
        <Button>Submit</Button>
      </Box>
    </div>
  );
}

export default Post