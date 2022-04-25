import React from 'react';
import {  useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';

import useStyle from './Styles'
const Posts = ({setCurrentId}) =>
{
    const posts = useSelector( state => state.posts);
    const classes = useStyle();
    console.log(posts);
    console.log(setCurrentId);
    console.log();
    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className = {classes.container} container alignItems ="stretch" spacing={5}>
                 {posts.map((post) => (
                     <Grid key={post._id} item xs={12} sm={6}>
                          <Post post={post} newCurrentId={setCurrentId}/>
                     </Grid>
                 ))}
            </Grid>
        )
    )
};

export default Posts;