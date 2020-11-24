import axios from "axios";
import React, { useState } from "react";

const Transfer = (props) => {
  const apiUrl = "http://localhost:5000/bank/";
  const [amount, setAmount] = useState();
  const [transferTo, setId] = useState();
  const [result, setResult] = useState();
  const { getUserData } = props;
  const { setUserData } = props;

  const makeTransfer = async (amount) => {
    if (amount && getUserData && transferTo) {
      const url = `${apiUrl}${getUserData.id}/transfer`;

      const resp = await axios.put(`${url}`, { recipient_id: transferTo, amount: amount });
      if (resp) {
        setResult(resp.data);
        const url2 = `${apiUrl}${getUserData.id}/`;

        const resp2 = await axios.get(`${url2}`);
        if (resp2) {
          setUserData(resp2.data);
        }
      }
    }
  }

  const showUserData = () => {
    const data = getUserData;
    if (data) {
      return (
        <div>
          <h6>Your Account Balance:<a href="#accountBalance">{data.balance}€</a></h6>
          <h6>Amount:</h6><input type="number" placeholder="€" onChange={(e) => setAmount(e.target.value)} />
          <h6>To ID: </h6><input placeholder="ID to transfer money" type="number" onChange={(e) =>
            setId(e.target.value)} />
          <h6><button onClick={() => makeTransfer(amount)}>Transfer</button></h6>
        </div>
      );

    } else {
      return "User not logged in.";
    }
  }

  const showResult = () => {
    return result;
  }

  return (
    <div className="mdl-layout__tab-panel">
      <section className="section--center mdl-grid mdl-grid--no-spacing">
        <div className="mdl-cell mdl-cell--12-col">
          <h4>&nbsp;&nbsp;Transfer Funds</h4>
          <ul className="toc">
            {showUserData()}
          </ul>
          <ul className="toc">
            {showResult()}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default Transfer;