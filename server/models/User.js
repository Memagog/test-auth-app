const  mongoose  = require("mongoose");

const UserModel = mongoose.Schema({    
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }  
})

const User = mongoose.model('User', UserModel);
module.exports = User;