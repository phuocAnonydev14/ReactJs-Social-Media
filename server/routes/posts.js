import express from "express";
import {addComment, deletePost, editComment, findPost, getFreePosts, getNotifications, getUserPosts, likePost, sharePost} from "../controllers/posts.js"
import {verifyToken} from "../middleware/auth.js";

const router = express.Router()

// Read
router.get("/",getFreePosts)
router.get("/:userId/posts",verifyToken,getUserPosts)

// Update
router.delete("/:id",verifyToken,deletePost)
router.patch("/:id/like",verifyToken,likePost)

router.post("/share",verifyToken,sharePost)

// router.get("/:id/comment",verifyToken,)
// id : post id
router.post("/:id/comment",verifyToken,addComment)
// id : comment id
router.patch("/:id/comment",verifyToken,editComment)

router.get('/:receiverId/notifications',verifyToken,getNotifications)

router.get("/query",verifyToken,findPost)

export default router