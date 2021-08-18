const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controller/posts')
// const multer = require('multer');

// // const storage = multer.diskStorage({
// // 	destination: (req, file, cb) => {
// // 		cb(null, 'uploads')
// // 	},
// // 	filename: (req, file, cb) => {
// // 		cb(null, file.filename + '-' + Date.now())
// // 	}
// // });
// const upload = multer({ storage: storage });

router.post("/auth", (req,res,next)=>{
    passport.authenticate("local", function(err, user, info){
        if(err){
            return res.status(400).json({ error: err});
        }
        if(!user){
            return res.status(400).json({ errors: `this User was not found`});
        }        
        req.logIn(user, function(err){
            if(err){
                return res.status(400).json({ error: err});
            }
            return res.status(200).json({message: `User was logged ${user.email} and user_id: ${user.id}`})
        })
    })(req,res,next)
})

router.get('/logout',(req,res,next)=>{
   req.logout();
   res.redirect('/login')     
})

router.post('/create', postController.createPost)

router.get('/getAll', postController.getAllPosts)

module.exports = router;