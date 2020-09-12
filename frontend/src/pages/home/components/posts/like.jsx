import React, {useContext, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import {Context} from '../../../../context/rootContext';
import {post} from '../../../../config/http';

function Like({postid, setUpdate, islike}){
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    useEffect(() => {
        if(islike === 1){
            setLike(true);
            setDislike(false)
        }else if(islike === -1){
            setDislike(true);
            setLike(false);
        }
    }, [islike]);
    const cont = useContext(Context);
    const req = (meth) => {
        if(!cont.username){
            window.alert('login to like/dislike');
            return;
        }
        const dat = {
            meth,
            postid
        }
        post('post/like', dat)
        .then(_data => {
        setUpdate(x => !x);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    return(
        <>
        <FontAwesomeIcon onClick={() => req('LIKE')} color={like ? '#107cfa' : 'grey'}  icon={faThumbsUp} className="mx-2 thumb" size="1x" />
        <FontAwesomeIcon onClick={() => req('DISLIKE')} color={dislike ? '#107cfa' : 'grey'}  icon={faThumbsDown} className="mx-2 thumb" size="1x" />
        </>
    );
}

export default Like;