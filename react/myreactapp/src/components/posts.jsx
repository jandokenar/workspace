import "./component.css"

const Posts = (props) => {
    const {
        data
    } = props;

    const singlePost = () => (
        <div className="myArr">
            <p><b>Title:</b> {data.title}</p>
            <p><b>Body:</b> {data.body}</p>
        </div>
    )

    const postArray = () => (

        data.map((item, index) => (
            <div key={index} className="myArr">
            <p><b>Title:</b> {item.title}</p>
            <p><b>Body:</b> {item.body}</p>
            </div>
        ))
    );

    return data ?
        data.length ?
            postArray() :
            singlePost() :
        "waiting for data";
};

export default Posts;