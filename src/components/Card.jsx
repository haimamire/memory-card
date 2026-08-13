import { useState, useEffect } from "react";

export default function Card({ name, onClick }) {
  const [img, setImg] = useState({});
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (imgLoaded) return;

    fetch(`https://kitsu.io/api/edge/characters?filter[name]=${name}`)
      .then((response) => response.json())
      .then((json) => {
        const title = json.data[0].attributes.names.en;
        const url = json.data[0].attributes.image.original;

        setImg({ url: url, title: title });
        setImgLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [imgLoaded, name]);

  return (
    <div className="card" onClick={onClick(name)}>
      <img src={img.url} alt={img.title} draggable={false} />
      <h2>{img.title ?? "Loading..."}</h2>
    </div>
  );
}
