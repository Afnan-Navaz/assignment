import React, {useState, useContext} from 'react';
import {Context} from '../../context/rootContext';
import {post} from '../../config/http.js';
import './login.scss';

function LoginPage (props) {
    const [issign, setIssign] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const cont = useContext(Context);

    const togSign = () => {
      setIssign(!issign);
    }

    const sub = (e) => {
      e.preventDefault();
      const data = {
        username,
        email,
        password
      }
      post(`user/${issign ? 'sign' : 'login'}`, data)
      .then(data => {
        cont.setUser(data.username);
        cont.setEmail(data.email);
        // cont.setId(data.id);
        // localStorage.setItem('userid', JSON.stringify(data._id));
        console.log('in');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      setUsername('');
      setEmail('');
      setPassword('');
      // props.history.push('/');
      window.location.href = '/';
      // window.location.reload();
    }

    return(
        <div className="container">
          <div className="form-box mx-auto mt-5 rounded-lg shadow-lg">
            <div className="head py-3 row rounded">
              <div className="col-10">
                <h1 className="text-center">{issign ? "Sign UP" : "Login"}</h1>
              </div>
              <div className="col-2">
                <button className="btn bt btn-light" onClick={togSign} >{issign ? "Login" : "Sign"}</button>
              </div>
            </div>
            <form onSubmit={sub}>
              {
                issign && (
                  <div className="form-group">
                    <label>User name</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="InputName"  placeholder="username" required />
                  </div>
                )
              }
              <div className="form-group">
                <label>Email address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="InputEmail1"  placeholder="email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="InputPassword" placeholder="Password" required />
              </div>
              <div className="d-flex">
                <button type="submit" className="btn btn-primary mx-auto">Submit</button>
              </div>
            </form>
          </div>
        </div>
    );
}

export default LoginPage;


            