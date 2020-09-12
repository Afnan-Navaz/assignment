const Post = require('../models/post-modal');

const all = async (req, res) => {
    try{
        let posts = await Post.find({}).populate({path: 'userID', select: 'email username -_id'}).sort('-createdAt').select('-updatedAt');
        posts = posts.map(x => {
            let likestate = 0;
            const id = req.session.userid;
            if(id){
                const inLike = x._doc.like.includes(id);
                const inDisLike = x._doc.dislike.includes(id);
                likestate = inLike ? 1 : (inDisLike ? -1 : 0);
            }
            return {...x._doc, like: x._doc.like.length, dislike: x._doc.dislike.length, islike: likestate};
        });
        res.send(posts);
    }catch(e){
        res.status(500).send(e);
    }
}

const like = async (req, res) => {
    try{
        const post = await Post.findById(req.body.postid);
        const id = req.session.userid;
        const inLike = post.like.includes(id);
        const inDisLike = post.dislike.includes(id);
        let state = 0;
        if(req.body.meth == 'LIKE'){
            if(!inLike){
                post.like = [...post.like, id];
                state = 1;
                if(inDisLike){
                    const array = post.dislike;
                    const index = array.indexOf(id);
                    if (index > -1) {
                    array.splice(index, 1);
                    }
                    post.dislike = array;
                    state = 2;
                }
            }
        }else{
            if(!inDisLike){
                post.dislike = [...post.dislike, id];
                state = -1;
                if(inLike){
                    const array = post.like;
                    const index = array.indexOf(id);
                    if (index > -1) {
                    array.splice(index, 1);
                    }
                    post.like = array;
                    state = -2;
                }
            }
        }
        await post.save();
        res.send({state});
    }catch(e){
        res.status(500).send(e);
    }
}

const newpost = async (req, res) => {
    try{
        const {title, body} = req.body;
        const newPost = await Post.create({
            userID: req.session.userid,
            title,
            body
        });
        res.send(newPost);
    }catch(e){
        res.status(500).send(e);
    }
}

module.exports = {all, like, newpost};