import React, {useEffect, useState} from 'react';
import UserAvatar from 'react-user-avatar';
import Pre from './pre';
import Like from './like';
import {socket} from '../../../../context/rootContext'
import './posts.scss';

function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        socket.on('allPost', (data) => setPosts(data));
        socket.on('update', () => socket.emit('allPost'));
        socket.emit('update');
    }, []);

    return(
        <div className="main-cont mx-5">
            {posts.map(x => {
                const date = new Date(x.createdAt);
                let pcent = 0;
                if((x.like + x.dislike) !== 0){
                    pcent = (x.like/(x.like + x.dislike))*100;
                }
                return (
                <div key={x._id} className="row my-5">
                    <div className="col-9">
                        <h5 className="title font-weight-bold">{x.title}</h5>
                        <Pre body={x.body} />
                        <div className="row">
                            <p className="date col-6">{date.toDateString()+ " " +date.toLocaleTimeString()}</p>
                            <div className="bar rounded mt-2"><div className="dar2d2" style={{width: `${pcent}%`}}></div></div>
                            <div className="col-3 ml-4">
                                <Like islike={x.islike} postid={x._id} />
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="d-flex">
                            <UserAvatar size="50" name={x.userID.username} className="avt font-weight-bold" />
                            <div className="ml-5">
                                <h6 className="font-weight-bold">{x.userID.username}</h6>
                                <small className="font-weight-light">{x.userID.email}</small>
                            </div>
                        </div>
                    </div>
                </div>
            )})}
        </div>
    );
}

export default Posts;