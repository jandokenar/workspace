const Balance = (props) => {
  const { getData } = props;

  const showData = () => {
    console.log(getData);
    const data = getData;
    if (data) {
      return (
        <div>
          <h6>Your Account Balance:<a href="#accountBalance">{data.balance}€</a></h6>
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
          <h4>Balance</h4>
          <ul className="toc">
            {showData()}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default Balance;