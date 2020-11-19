import React, { useState } from "react";

const Inputbar = (props) => {
    const { getData } = props;
    // const { postData } = props;
    const [text, setText] = useState();
    const [user, setUser] = useState();

    return (
        <div>
            <form>
                <span className="formtext">FORM</span>
                <input
                    type="text"
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Enter Usermame"
                    required
                />
                <button onClick={() => alert(user)}>Go!</button>
            </form>
            <input onChange={(e) => setText(e.target.value)} />
            <button onClick={() => getData(text)}> Get Data </button>
        </div>
    );
};

export default Inputbar;