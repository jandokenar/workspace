import React, { useState } from "react";

const Inputlogin = (props) => {
    const { getUserData } = props;
    const [text, setText] = useState();

    return (

        <div><input type="number" placeholder="Enter your id" onChange={(e) => setText(e.target.value)} />
            &nbsp;&nbsp;<button onClick={() => getUserData(text)}>Login</button>
        </div>

    );
};

export default Inputlogin;
