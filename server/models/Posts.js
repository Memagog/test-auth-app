const  mongoose  = require("mongoose");

const PostsModel = mongoose.Schema({    
    text: {
        type: String,        
    },
    img: { 
        data: Buffer, 
        contentType: String 
    }
})

const Post = mongoose.model('Post', PostsModel);
module.exports = Post;