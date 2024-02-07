import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import useStyles from './styles';

const Posts = ({currentId, setCurrentId, setDeleteId}) => {
  const posts = useSelector((state) => {
    return state.posts;
  });

  const classes = useStyles();

  console.log(posts, "posts on every render");

  return (
      !posts.length ? <CircularProgress /> : ( 
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post)=>
            (
                <Grid key={post.id} item xs={12} sm={6} md={6}>
                    <Post post={post} setCurrentId={setCurrentId} setDeleteId={setDeleteId}/>
                    </Grid>
            )
            )}

        </Grid>
      )
  );
};

export default Posts;
