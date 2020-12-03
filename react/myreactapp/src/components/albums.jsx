import "./component.css"

const Albums = (props) => {
    const {
        data
    } = props;

    const singleAlbum = () => (
        <div className="myArr">
            <p><b>Title:</b> {data.title}</p>
        </div>
    )

    const albumArray = () => (

        data.map((item, index) => (
            <div key={index} className="myArr">
            <p><b>Title:</b> {item.title}</p>
            </div>
        ))
    );

    return data ?
        data.length ?
            albumArray() :
            singleAlbum() :
        "waiting for data";
};

export default Albums;