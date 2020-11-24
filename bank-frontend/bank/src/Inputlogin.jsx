import React, { useState } from "react";

const Inputlogin = (props) => {
    const { getData } = props;
    const [text, setText] = useState();

    return (

        <div><input type="number" onChange={(e) => setText(e.target.value)} />
            &nbsp;&nbsp;<button onClick={() => getData(text)}>Login</button>
        </div>

    );
};

export default Inputlogin;
