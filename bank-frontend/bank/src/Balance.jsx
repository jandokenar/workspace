const Balance = (props) => {
  const { getUserData } = props;

  const showUserData = () => {
    const data = getUserData;
    if (data) {
      return (
        <div>
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
          <h4>&nbsp;&nbsp;Balance</h4>
          <ul className="toc">
            {showUserData()}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default Balance;