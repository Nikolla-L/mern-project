import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await PostMessage.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const addPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({...post, author: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    let post = req.body;

    if(!mongoose.Types.ObjectId(id)) {
        return res.status(404).send('Not found post with this Id');
    }

    post = {...post, id}
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    res.status(201).json(updatePost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId(id)) {
        return res.status(404).send('Not found post with this Id');
    }

    await PostMessage.findByIdAndRemove(id);
    res.status(201).json({message: 'Post has been deleted successfully'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) {
        console.log(req)
        return res.status(401).json({message: 'Unauthenticated'});
    }

    if(!mongoose.Types.ObjectId(id)) {
        return res.status(404).send('Not found post with this Id');
    }
    
    let post = await PostMessage.findById(id);
    let index = post.likes.findIndex(id => id === String(req.userId));
    if(index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes.splice(index, 1)
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    return res.status(201).json(updatedPost);
}