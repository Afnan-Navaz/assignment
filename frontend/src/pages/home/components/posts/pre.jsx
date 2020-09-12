import React, {useState} from 'react';

function Pre({body}){
    const [short, setShort] = useState(true);
    const seemore = () => {
        setShort(!short);
    }
    return(
        <>
            <pre wrap="soft">{short ? body.slice(0, 400) : body}</pre>
            {
                body.length > 400 && <div className="abox">
                <p onClick={seemore} className="btn-link show">{short ? 'See more' : 'See less'}</p>
                </div>
            }
        </>
    )
}

export default Pre;