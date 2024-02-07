import React, { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import {StyledPaper,StyledForm,StyledFileInput, StyledButton} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import { createPosts, updatePost } from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({  title: "", message: "", tags: "", selectedFile: "", });
  const post = useSelector((state)=> currentId ? state.posts.find((post)=> post._id === currentId ) : null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(()=>{
    if(post){
      setPostData(post);
    }
  },[post]);

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(currentId){
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    }else{
      dispatch(createPosts({...postData, name: user?.result?.name}));
    }
    clear();
  };

  const clear = ()=>{
    setCurrentId(null);
    setPostData({ title: "", message: "", tags: "", selectedFile: "", });
  };

  if(!user?.result?.name){
    return (
      <StyledPaper>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memoires and like other's memoires!
        </Typography>
      </StyledPaper>
    );
  }


  return (
    <StyledPaper>
      <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit} >
        <Typography variant="h6">{currentId ? 'Editing':'Creating'} a Memory</Typography>
        {/* <TextField name="creator" variant="outlined" label="creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value }) } /> */}
        <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="message" rows={4} fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value }) } />
        <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} />
        <StyledFileInput> <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) } /></StyledFileInput>
        <StyledButton variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleSubmit}>Submit</StyledButton>
        <StyledButton  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</StyledButton>

      </StyledForm>
    </StyledPaper>
  );
};

export default Form;
