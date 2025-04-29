import express from "express";
// import Signup from "../Controllers/userController.js";
import { SignIn,Signup,Logout,Posts, LikePhoto,likedata,profile,Followuser,followedUsers,userPosts,Users} from "../../Controllers/userController.js";
import User from "../../Model/model.js";
// import Follow from "../../Model/Follow.js";
const router = express.Router();
console.log("Router called");

// Change from router.get to router.post since it's a signup form submission
router.post('/signup', Signup);
router.post('/signin',SignIn)
router.get('/logout',Logout)
router.get('/posts', Posts)
router.put('/liked/:postId/:userId', LikePhoto);
router.get('/likedata/:userId', likedata);
router.get('/profile/:userId',profile)
router.put('/follow/:userId/:PostId', Followuser)
router.get('/followdata/:UserId',followedUsers)
router.get('/userPosts/:userId',userPosts)
router.get('/users', Users);
export default router;
