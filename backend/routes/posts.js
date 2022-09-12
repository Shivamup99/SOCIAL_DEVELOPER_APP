import express from 'express'
import { commentPosts, createPost, deleteComment, deletePosts, getAllPost, getPost, likePost, unlikePost } from '../controller/posts.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/posts',auth,createPost)
router.get('/posts',getAllPost)
router.get('/posts/:id',auth,getPost)
router.delete('/posts/:id',auth,deletePosts)
router.post('/posts/like/:id',auth,likePost)
router.post('/posts/unlike/:id',auth,unlikePost)
router.post('/posts/comment/:id',auth,commentPosts)
router.delete('/posts/comment/:id/:comment_id',auth,deleteComment)
export default router