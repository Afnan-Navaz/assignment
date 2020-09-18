import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Context} from '../../context/rootContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Floating from './components/floating/floating';
import UserAvatar from 'react-user-avatar';
import Posts from './components/posts/posts';
import {get} from '../../config/http';
import './home.scss';

function Home(){

    const cont = useContext(Context);
    const [float, setFloat] = useState(false);
    const toggleFloat = () => {
        if(cont.username){
            setFloat(!float);
        }else{
            window.alert('login to share your thoughts');
        }
    }
    useEffect(() => {
        if(!cont.username){
            get('user/cred')
        .then(dat => {
            cont.setUser(dat.username);
            cont.setEmail(dat.email);
            localStorage.setItem('userid', dat._id);
        })
        .catch(e => console.log(e));
        }
    }, [cont]);
    return(
        <div className="container-fluid">
            {float && <Floating toggle={toggleFloat} />}
            <div className="row tinp">
                <div className="container col-10">
                    <input onClick={toggleFloat} type="text" placeholder="what do yo want to tel the world?" className="dummy w-75 ml-5" />
                </div>
                <div className="col-2 m1-5">
                    {cont.username ? <UserAvatar size="35" name={cont.username} className="ml-2 avt" /> :
                    <FontAwesomeIcon  icon={faUserCircle} className="ml-1" size="2x" color="#107cfa" />}
                    <div>
                    {cont.username ? <Link className="font-weight-bold" to='/logout'>logout</Link>  : 
                    <Link to="/login" className="font-weight-bold">login</Link>}
                    </div>
                </div>
            </div>
            <Posts />
        </div>
    )
}

export default Home;