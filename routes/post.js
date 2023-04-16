const { createPost, updatePost, deletePost,allPosts } = require("../controller/postController");
const router = require("express").Router();



router.post("/newpost", createPost);//caption,userId
router.post("/updatepost/:userId/:postId", updatePost);//userId,postId
router.delete("/deletepost/:userId/:postId", deletePost);//userId,postId
router.get("/allposts",allPosts)
module.exports = router;