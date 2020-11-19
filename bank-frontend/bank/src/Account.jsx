const Account = (props) => {
  const { getData } = props;

  const showData = () => {
    console.log(getData);
    const data = getData;
    if (data) {
      // return JSON.stringify(data, null, 2); // debug
      return (
        <div>
          <h6>Name:<a href="#accountName">{data.name}</a></h6>
          <h6>ID:<a href="#accountID">{data.id}</a></h6>
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