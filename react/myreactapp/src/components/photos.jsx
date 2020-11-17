import "./component.css"

const Photos = (props) => {
    const {
        data
    } = props;

    const singlePhoto = () => (
        <div className="myArr">
            <p><b>Title:</b> {data.title}</p>
            <p><b>Url:</b> <a target="_blank" rel="noreferrer" href={data.url}>{data.url}</a></p>
            <p><img src={data.url} alt={data.title}></img></p>
        </div>
    )

    const photoArray = () => (

        data.map((item, index) => (
            <div key={index} className="myArr">
            <p><b>Title:</b> {item.title}</p>
            <p><b>Url:</b> <a target="_blank" rel="noreferrer" href={item.url}>{item.url}</a></p>
            <p><img src={item.url} alt={item.title}></img></p>
            </div>
        ))
    );

    return data ?
        data.length ?
            photoArray() :
            singlePhoto() :
        "waiting for data";
};

export default Photos;