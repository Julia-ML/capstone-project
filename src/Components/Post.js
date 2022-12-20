import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/posts.js'
import { createPost } from '../store/posts.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Typography from '@mui/material/Typography';
import auth from '../store/auth.js';

const Post = () => {
    const { posts } = useSelector(state => state)
    const dispatch = useDispatch();
    const [userPost, setUserPost] = useState({
        text: "",
        userId: "",
    });

    useEffect(()=> {
        dispatch(fetchPosts());
    }, []);

    const [error, setError] = useState({});

    const submitPost = async (ev) => {
        ev.preventDefault();
        try {
            await dispatch(createPost(userPost));
            setUserPost({
                text: "",
                userId: auth.id,
            });
            setError({});
        }
        catch(err) {
            setError(err.response.data);
        }
    }

    let errorMessages = [];

	if (error.errors) {
		errorMessages = error.errors.map((err) => err.message);
	}

    const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
          color: theme.palette.action.disabled,
        },
      }));
      
      const customIcons = {
        1: {
          icon: <SentimentVeryDissatisfiedIcon color="error" />,
          label: 'Very Dissatisfied',
        },
        2: {
          icon: <SentimentDissatisfiedIcon color="error" />,
          label: 'Dissatisfied',
        },
        3: {
          icon: <SentimentSatisfiedIcon color="warning" />,
          label: 'Neutral',
        },
        4: {
          icon: <SentimentSatisfiedAltIcon color="success" />,
          label: 'Satisfied',
        },
        5: {
          icon: <SentimentVerySatisfiedIcon color="success" />,
          label: 'Very Satisfied',
        },
      };
      
      function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
      }
      
      IconContainer.propTypes = {
        value: PropTypes.number.isRequired,
      };

  return (
    <div>
      <Box component="span" sx={{ p: 2, border: '' }}>
        <div>
            <form onSubmit={submitPost}>
            <InputLabel htmlFor="filled-textarea">Create New Post:</InputLabel>
            <TextField
                id="filled-textarea"
                label="Text here.."
                placeholder="Begin.."
                multiline
                rows={7}
                variant="filled"
                defaultValue={userPost.text}
				onChange={(ev) => setUserPost({ ...userPost, text: ev.target.value })}
            />
            <Typography component="legend">Feeling</Typography>
            <StyledRating
                name="highlight-selected-only"
                defaultValue={2}
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
            />
            <Button onClick={submitPost}>Submit</Button>
            </form>
        </div>
        <div>
            <Box>
                {/* {
                    posts.map(post => {
                        return ([
                            <Card>
                                <Typography>{ post.text }</Typography>
                            </Card>
                        ])
                    })
                } */}
            </Box>
        </div>
      </Box>
    </div>
  );
}

export default Post