import "./component.css"

const Todos = (props) => {
    const {
        data
    } = props;

    const singleTodo = () => (
        <div className="myArr">
            <p><b>Title:</b> {data.title}</p>
            <p><b>Completed:</b> {data.completed ? "true" : "false"}</p>
        </div>
    )

    const todoArray = () => (

        data.map((item, index) => (
            <div key={index} className="myArr">
                <p><b>Title:</b> {item.title}</p>
                <p><b>Completed:</b> {item.completed ? "true" : "false"}</p>
            </div>
        ))
    );

    return data ?
        data.length ?
            todoArray() :
            singleTodo() :
        "waiting for data";
};

export default Todos;