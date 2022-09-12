import Posts from '../modals/posts.js'
import Profile from '../modals/profile.js'
export const createPost = async(req,res)=>{
    try {
        const newPost = new Posts({
            text:req.body.text,
            name:req.body.name,
            avatar:req.body.avatar,
            user:req.user.id
        })
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getAllPost = async(req,res)=>{
    try {
        const posts = await Posts.find().sort({createdAt:-1})
        res.status(200).json({posts:posts})
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getPost = async(req,res)=>{
    try {
        const posts = await Posts.findById(req.params.id)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete posts with owner profile check

export const deletePosts = async(req,res)=>{
    try {
       await Profile.findOne({user:req.user.id})
        const post = await Posts.findById(req.params.id) 
        if(post){
            if(post.user.toString()!==req.user.id){
                return res.status(401).json('user not authorized')
            }
        }
        await post.remove()
        res.status(200).json({success:true})  
    } catch (error) {
        res.status(500).json(error)
    }
}

// like the post

export const likePost = (req,res)=>{
   Profile.findOne({user:req.user.id}).then(profile=>{
    Posts.findById(req.params.id).then(post=>{
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(400).json({alreadyLiked:'User already liked'})
        }
        post.likes.unshift({user:req.user.id})
        post.save().then(post=>res.json(post))
    }).catch(err=> res.status(404).json({postNotFound:'No post found'}))
   })
}

// unlike a post

export const unlikePost = (req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
     Posts.findById(req.params.id).then(post=>{
         if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
             return res.status(400).json('no likes are there')
         }
         const removeIndex = post.likes.map(item=>item.user.toString())
         .indexOf(req.user.id)
         post.likes.splice(removeIndex,1)
         post.save().then(post=>res.json(post))
     }).catch(err=> res.status(404).json({postNotFound:'No post found'}))
    })
 }

 // comment on a post

 export const commentPosts = (req,res)=>{
    Posts.findById(req.params.id).then(post=>{
        const newComment = {
            text:req.body.text,
            name:req.body.name,
            avatar:req.body.avatar,
            user:req.user.id,
        }
        post.comments.unshift(newComment)
        post.save().then(post=>res.json(post))
    }).catch(err=>res.status(400).json('no post found'))
 }

 //delete comment from post

 export const deleteComment = (req,res)=>{
    Posts.findById(req.params.id).then(post=>{
        if(post.comments.filter(comment=>comment._id.toString()===req.params.comment_id).length===0){
            return res.status(404).json('comment does not here')
        }
        const removeIndex = post.comments.map(item=>item._id.toString())
        .indexOf(req.params.comment_id)

        post.comments.splice(removeIndex,1)
        post.save().then(post=>res.json(post))
    }).catch(err=>res.status(404).json('post not found'))
 }