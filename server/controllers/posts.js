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

    const newPost = new PostMessage(post);

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

    if(!mongoose.Types.ObjectId(id)) {
        return res.status(404).send('Not found post with this Id');
    }
    
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount+1}, {new: true});

    res.status(201).json(updatedPost);
}