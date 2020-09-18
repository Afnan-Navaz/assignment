import React, {useState} from 'react';
import './floating.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {post} from '../../../../config/http';
import {socket} from '../../../../context/rootContext'

function Floating({toggle}) {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();

    const sub = (e) => {
        e.preventDefault();
        const data = {
          title,
          body,
        }
        post('post/new', data)
        .then(_data => {
          // setUpdate(x => !x);
          socket.emit('update');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        toggle();
      }

    return(
        <div className="floating rounded shadow-lg">
            <FontAwesomeIcon onClick={toggle}  icon={faTimesCircle} className="close" />
            <form onSubmit={sub} className="form-group container px-4" autoComplete="off" method="POST" >
                <input onChange={(e) => setTitle(e.target.value)} className="form-control-lg form-control my-3 text-center border-dark font-weight-bold" required
                    placeholder="Title" type="text" name="title" />
                <textarea value={body} onChange={(e) => setBody(e.target.value)} className="my-3 p-2 text-justify w-100 rounded border-dark area" required wrap="soft" type="text"
                    name="content"></textarea>
                <button className="btn btn-primary mx-auto d-block mx-auto" type="submit">publish</button>
            </form>
        </div>
    );
}

export default Floating;