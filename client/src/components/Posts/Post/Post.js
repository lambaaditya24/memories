import React from "react";
import useStyles from './styles';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost, likePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";

const Post = ({post, setCurrentId, setDeleteId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleDelete = (id) =>{
        setDeleteId(id);
        dispatch(deletePost(id));
    };

    const Likes = ()=>{
        if(post.likes.length>0){
            return post.likes.find((like)=> like ===(user?.result?.googleId || user?.result?._id)) 
            ?(
                <><ThumbUpIcon fontSize="small"/> &nbsp; {post.likes.length>2 ? `You and ${
                    post.likes.length -1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's':''}`}</>
            ):
            (
                <><ThumbUpIcon fontSize="small"/> &nbsp; {post.likes.length} {post.likes.length===1?'Like':'Likes'}</>
            )
        }

        return <><ThumbUpIcon fontSize="small"/>&nbsp;Like</>
    };

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {/* only user who has created the post can edit it */}
            {(user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
                <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick={()=>{setCurrentId(post._id)}}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            )}
            
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=> `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={()=>{dispatch(likePost(post._id))}}>
                    <Likes />
                </Button>

                {/* only user that has created the post can delete it */}
                {(user?.result?.googleId === post.creator || user?.result?._id === post.creator) &&
                (<Button size="small" color="primary" onClick={()=>{handleDelete(post._id)}}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>) }
            </CardActions>
        </Card>
    )
};

export default Post;