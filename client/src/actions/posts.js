import * as api from '../api';
import { CREATE, UPDATE, FETCH_ALL, DELETE, LIKE} from '../constants/actionTypes';

// Action creators

export const getPosts = ()=> async(dispatch) => {
        try{
            const { data } = await api.fetchPosts();
            dispatch({type:FETCH_ALL, payload: data});
        }catch(error){
            console.log(error.message);
        }
};

export const createPosts = (newPost)=> async(dispatch) => {
    try{
        const { data } = await api.createPosts(newPost);
        dispatch({type:CREATE, payload: data});
    }catch(error){
        console.log(error);
    }
};

export const updatePost = (id, editedPost)=> async(dispatch) => {
    try{
        console.log(editedPost, 'post to be edited')
        const { data } = await api.editPost(id,editedPost);
        dispatch({type:UPDATE, payload: data});
    }catch(error){
        console.log(error);
    }
};


export const deletePost = (id)=> async(dispatch) => {
    try{
        console.log(id, 'id to be deleted')
        const { data } = await api.deletePost(id);
        dispatch({type:DELETE, payload: data});
    }catch(error){
        console.log(error);
    }
};

export const likePost = (id) => async(dispatch) =>{
    const user = JSON.parse(localStorage.getItem('profile'));
    try{
        const {data} = await api.likePost(id, user?.token);
        console.log(data,"data after liked post");
        dispatch({type:LIKE, payload:data});
    }catch(error){
        console.log(error);
    }
}