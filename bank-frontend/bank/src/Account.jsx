import axios from "axios";
import React, { useState } from "react";

const Account = (props) => {
  const { getData } = props;
  let [name, setName] = useState();
  const [edit, setEdit] = useState(false);
  const { setData } = props;

  if (getData && !name) {
    name = getData.name;
  }

  const saveName = async (name) => {
    if (edit) {
      setEdit(false);
      if (name !== getData.name) {
        const url = `http://localhost:5000/bank/${getData.id}/name`;

        const resp = await axios.put(`${url}`, { new_name: name });
        if (resp) {
          const url2 = `http://localhost:5000/bank/${getData.id}/`;

          const resp2 = await axios.get(`${url2}`);
          if (resp2) {
            setData(resp2.data);
          }
        }
      }
    }
  }

  const changeName = () => {
    if (edit) {
      return (
        <div>
          <h6>Name:</h6><input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />&nbsp;&nbsp;
          <button onClick={() => saveName(name)}>Save</button>
        </div>
      );
    } else {
      return (
        <h6>Name:<a href="#accountName">{getData.name}&nbsp;&nbsp;
        <button onClick={() => setEdit(true)}>Edit</button></a></h6>
      );
    }
  }

  const showData = () => {
    const data = getData;
    if (data) {
      // return JSON.stringify(data, null, 2); // debug
      return (
        <div>
          {changeName()}
          <h6>ID:<a href="#accountID">{data.id}</a></h6>
          <h6>Balance:<a href="#balance">{data.balance}€</a></h6>
        </div>
      );

    } else {
      return "User not found.";
    }
  }


  return (
    <div className="mdl-layout__tab-panel">
      <section className="section--center mdl-grid mdl-grid--no-spacing">
        <div className="mdl-cell mdl-cell--12-col">
          <h4>Account</h4>
          <ul className="toc">
            {showData()}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default Account;