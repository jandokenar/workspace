import React, { useState } from "react";

const Inputbar = (props) => {
    const { getData } = props;
    const [text, setText] = useState(); 

    return (
        <div>
            <input onChange={(e) => setText(e.target.value)}/>
            <button onClick={() => getData(text)}> Get Data </button>
        </div>
    );
};

export default Inputbar;