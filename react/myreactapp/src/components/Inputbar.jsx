import React, { useState } from "react";

const Inputbar = (props) => {
    const { getData } = props;
    // const { postData } = props;
    const [text, setText] = useState();
    const [company, setCompany] = useState();

    return (
        <div>
            <form>
                <span className="formtext">FORM</span>
                <input
                    type="text"
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter Company Name"
                    required
                />
                <button onClick={() => alert(company)}>Go!</button>
            </form>
            <input onChange={(e) => setText(e.target.value)} />
            <button onClick={() => getData(text)}> Get Data </button>
        </div>
    );
};

export default Inputbar;