import axios from "axios";
import React, { useState } from "react";

const Withdraw = (props) => {
  const apipUrl = "http://localhost:5000/bank/";
  const [amount, setAmount] = useState();
  const { getData } = props;
  const { setData } = props;

  const makeWithdraw = async (amount) => {
    if (amount && getData) {
      const url = `${apipUrl}${getData.id}/withdraw`;

      const resp = await axios.put(`${url}`, { amount: amount });
      if (resp) {
        const url2 = `${apiUrl}${getData.id}/`;

        const resp2 = await axios.get(`${url2}`);
        if (resp2) {
          setData(resp2.data);
        }
      }
    }
  }

  const showUserData = () => {
    const data = getData;
    if (data) {
      return (
        <div>
          <input placeholder="€" type="number" onChange={(e) => setAmount(e.target.value)} />&nbsp;&nbsp;
          <button onClick={() => makeWithdraw(amount)}>Withdraw</button>
          <h6>Your Account Balance:<a href="#accountBalance">{data.balance}€</a></h6>
        </div>
      );

    } else {
      return `User not logged in.`;
    }
  }


  return (
    <div className="mdl-layout__tab-panel">
      <section className="section--center mdl-grid mdl-grid--no-spacing">
        <div className="mdl-cell mdl-cell--12-col">
          <h4>&nbsp;&nbsp;Withdraw</h4>
          <ul className="toc">
            {showUserData()}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default Withdraw;