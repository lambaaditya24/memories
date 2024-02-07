import React,{useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import { getPosts } from "../../actions/posts";
import {useDispatch} from 'react-redux';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";


const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,deleteId,dispatch]);

    return (
        <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} >
            <Grid item xs={12} sm={7}>
              <Posts currentId={currentId} setCurrentId={setCurrentId} setDeleteId={setDeleteId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6}>

              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    );
};


export default Home;