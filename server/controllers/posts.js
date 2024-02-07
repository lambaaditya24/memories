import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.messsage });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  console.log(post);
  
  const newPost = new PostMessage({...post, creator:req.userId, createdAt: new Date().toISOString()});
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const editPost = async (req, res) => {
  const _id = req.params.id;
  const post = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('No post with that id')
  }

  try {
    const udpatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true} );
    res.status(200).json(udpatedPost)

  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const deletePost = async (req, res) => {
  const _id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('No post with that id')
  }

  try {
    const deletedPost = await PostMessage.findByIdAndDelete(_id );
    res.status(200).json(deletedPost)

  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const likePost = async (req, res) => {
  const {id} = req.params;
  console.log(id);
  //checking if the user is valid in auth middleware
  if(!req.userId){
    return res.json({message:'Unauthenticated'});
  }


  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send(`No post with that id ${id}`);
  }

  const post = await PostMessage.findById(id);
  console.log(post,"like post")
  const index = post.likes.findIndex((id)=> id===String(req.userId));

  if(index === -1){
    post.likes.push(req.userId)
  }else{
    post.likes = post.likes.filter((id)=> id!== String(req.userId))
  }

  const udpatedPost = await PostMessage.findByIdAndUpdate(id, post,{new:true})
  res.status(200).json(udpatedPost);

};