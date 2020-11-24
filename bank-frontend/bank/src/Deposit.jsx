import axios from "axios";
import React, { useState } from "react";

const Deposit = (props) => {
  const apipUrl = "http://localhost:5000/bank/"
  const [amount, setAmount] = useState();
  const { getData } = props;
  const { setData } = props;

  const makeDeposit = async (amount) => {
    if (amount && getData) {
      const url = `${apipUrl}${getData.id}/deposit`;

      const resp = await axios.put(`${url}`, { amount: amount });
      if (resp) {
        const url2 = `${apipUrl}${getData.id}/`;

        const resp2 = await axios.get(`${url2}`);
        if (resp2) {
          setData(resp2.data);
        }
      }
    }
  }

  const showData = () => {
    const data = getData;
    if (data) {
      return (
        <div>
          <input placeholder="€" type="number" onChange={(e) => setAmount(e.target.value)} />&nbsp;&nbsp;
          <button onClick={() => makeDeposit(amount)}>Deposit</button>
          <h6>Your Account Balance:<a href="#accountBalance">{data.balance}€</a></h6>
        </div>
      );

    } else {
      return "User not logged in.";
    }
  }


  return (
    <div className="mdl-layout__tab-panel">
      <section className="section--center mdl-grid mdl-grid--no-spacing">
        <div className="mdl-cell mdl-cell--12-col">
          <h4>&nbsp;&nbsp;Deposit</h4>
          <ul className="toc">
            {showData()}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default Deposit;