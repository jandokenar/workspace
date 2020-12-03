import "./component.css"

const Debug = (props) => {
    const {
        data
    } = props;

    const singleDebug = () => (
        <div className="myArr">
           <pre>{JSON.stringify(data, null, 2) }</pre>
        </div>
    )

    const debugArray = () => (

        data.map((item, index) => (
            <div key={index} className="myArr"><pre>{JSON.stringify(item, null, 2) }</pre></div>
        ))
    );

    return data ?
        data.length ?
            debugArray() :
            singleDebug() :
        "waiting for data";
};

export default Debug;