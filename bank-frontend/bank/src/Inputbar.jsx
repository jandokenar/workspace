import React, { useState } from "react";

const Inputbar = (props) => {
    const { getData } = props;
    const [text, setText] = useState(); 

    return (
        <div>
            <input type="number" onChange={(e) => setText(e.target.value)}/>
            <button onClick={() => getData(text)}>Login</button>
        </div>
    );
};

export default Inputbar;
