const PostDB = require('../models/post-modal');
const {sessionsetup} = require('./setup');
// const io = require('socket.io');

const setupIO = (io) => {
    io.use((socket, next) => {
        sessionsetup(socket.request, {}, next);
    })
    io.on('connection', socket => {
        console.log('client connected');
        socket.on('allPost', async () => {
            try{
                let posts = await PostDB.find({}).populate({path: 'userID', select: 'email username -_id'}).sort('-createdAt').select('-updatedAt');
                posts = posts.map(x => {
                    let likestate = 0;
                    const id = socket.request.session.userid;
                    if(id){
                        const inLike = x._doc.like.includes(id);
                        const inDisLike = x._doc.dislike.includes(id);
                        likestate = inLike ? 1 : (inDisLike ? -1 : 0);
                    }
                    return {...x._doc, like: x._doc.like.length, dislike: x._doc.dislike.length, islike: likestate};
                });
                io.emit('allPost', posts);
            }catch(e){
                console.log(e);
            }
        })
        socket.on('disconnect', () => console.log('client disconnected'));
    });
}

module.exports = setupIO;