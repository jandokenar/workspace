import "./component.css"

const Photos = (props) => {
    const {
        data
    } = props;

    const singlePhoto = () => (
        <div className="myArr">
            <p><h3>{data.title}</h3></p>
            <p><a target="_blank" rel="noreferrer" href={data.url}><img src={data.url} alt={data.title}></img></a></p>
        </div>
    )

    const photoArray = () => (

        data.map((item, index) => (
            <div key={index} className="myArr">
            <p><h3>{item.title}</h3></p>
            <p><a target="_blank" rel="noreferrer" href={item.url}><img src={item.url} alt={item.title}></img></a></p>
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