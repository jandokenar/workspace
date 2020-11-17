const SomeComponent = (props) => {
    const {
        helpBoolean,
        text,
        action
    } = props;
    return (
        <div>
            <p>{helpBoolean ? text : ""}</p>
            <p>{helpBoolean && text}</p>
            <button onClick={() => action("")}>Click Me</button>
            <p>-------------------</p>
        </div>
    );
}

export default SomeComponent