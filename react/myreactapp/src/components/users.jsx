import "./component.css"

const Users = (props) => {
    const {
        data
    } = props;

    const singleUser = () => (
        <div className="myArr">
            <p><b>Name:</b> {data.name}</p>
            <p><b>Username:</b> {data.username}</p>
            <p><b>Email:</b> {data.email}</p>
            <p><b>Adress:</b> {JSON.stringify(data.address, null, 2) }</p>
            <p><b>Phone:</b> {data.phone}</p>
            <p><b>Website:</b> <a target="_blank" rel="noreferrer" href={"https://"+data.website}>{data.website}</a></p>
        </div>
    )

    const userArray = () => (

        data.map((item, index) => (
            <div key={index} className="myArr">
                <p><b>Name:</b> {item.name}</p>
                <p><b>Username:</b> {item.username}</p>
                <p><b>Email:</b> {item.email}</p>
                <p><b>Adress:</b> {JSON.stringify(item.address, null, 2) }</p>
                <p><b>Phone:</b> {item.phone}</p>
                <p><b>Website:</b> <a target="_blank" rel="noreferrer" href={"https://"+item.website}>{item.website}</a></p>
            </div>
        ))
    );

    return data ?
        data.length ?
            userArray() :
            singleUser() :
        "waiting for data";
};

export default Users;