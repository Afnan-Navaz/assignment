import React, {createContext, useState} from 'react';

export const Context = createContext();
function ContextProvider(props){
    const [username, setUser] = useState();
    const [email, setEmail] = useState();

    return (
        <Context.Provider value={{username, setUser, email, setEmail}}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;