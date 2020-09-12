import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {get} from '../../config/http';

function Logout() {
    useEffect(() => {
        get('user/logout')
        .then(dat => {
            console.log(dat);
        })
        .catch(e => console.log(e));
        window.location.reload();
    });
    return(
        <Redirect to="/" />
    )
}

export default Logout;