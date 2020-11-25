import axios from "axios";
import React, { useState } from "react";

const Account = (props) => {
  const apiUrl = "http://localhost:5000/bank/";
  const { getUserData } = props;
  let [name, setName] = useState();
  const [balance, setBalance] = useState();
  const [edit, setEdit] = useState(false);
  const { setUserData } = props;

  if (getUserData && !name) {
    name = getUserData.name;
  }

  const saveName = async (name) => {
    if (edit) {
      setEdit(false);
      if (name !== getUserData.name) {
        const url = `${apiUrl}${getUserData.id}/name`;

        const resp = await axios.put(`${url}`, { new_name: name });
        if (resp) {
          const url2 = `${apiUrl}${getUserData.id}/`;

          const resp2 = await axios.get(`${url2}`);
          if (resp2) {
            setUserData(resp2.data);
          }
        }
      }
    }
  }

  const createAccount = async (name, balance) => {
    if (name && balance) {

      const url = `${apiUrl}new`;

      const resp = await axios.post(`${url}`, {
        name: name,
        password: "passu", // dummy password (secure login not implemented)
        balance: balance
      });
      if (resp) {
        setUserData(resp.data);
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
        <h6>Name:<a href="#accountName">{getUserData.name}&nbsp;&nbsp;
        <button onClick={() => setEdit(true)}>Edit</button></a></h6>
      );
    }
  }

  const showUserData = () => {
    const data = getUserData;
    if (data) {
      return (
        <div>
          <h4>&nbsp;&nbsp;Account</h4>
          <ul className="toc">
            {changeName()}
            <h6>ID:<a href="#accountID">{data.id}</a></h6>
            <h6>Balance:<a href="#balance">{data.balance}€</a></h6>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h4>&nbsp;&nbsp;Create New Account</h4>
          <ul className="toc">
            <div>
              <h6>Name:</h6><input placeholder="Enter your name" type="text" onChange={(e) => setName(e.target.value)} />
              <h6>Balance:</h6><input placeholder="€" type="number" onChange={(e) => setBalance(e.target.value)} />
              <h6><button onClick={() => createAccount(name, balance)}>Create Account</button></h6>
            </div>
          </ul>
        </div>
      );
    }
  }


  return (
    <div className="mdl-layout__tab-panel">
      <section className="section--center mdl-grid mdl-grid--no-spacing">
        <div className="mdl-cell mdl-cell--12-col">
          {showUserData()}
        </div>
      </section>
    </div>
  );
}
export default Account;