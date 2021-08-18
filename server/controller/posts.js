const mongoose = require("mongoose");
const express = require('express');
const Post = require("../models/Posts");
const fs = require('fs');
const path = require('path');
const postController = {

    createPost(req,res){
        // const obj = {
        //     text: req.body.text,            
        //     // img: {
        //     //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file)),
        //     //     contentType: 'image/png'
        //     // }
        // }    
   
        const newPost = new Post({text: req.body.text});
        
        newPost.save().then((post)=>{
            if(post){
                return res.json({message: `Your post: ${post}`})
            }
        })
    },

    getAllPosts(req,res){        
        Post.find({}).then((result)=>{return res.json({result})});                 
    }
}
module.exports = postController;