import { useState, useEffect } from "react";

export default function Card({ imgId, onClick }) {
  const [img, setImg] = useState({});
  const [imgLoaded, setImgLoaded] = useState(false);

  // useEffect(() => {
  //   fetch(
  //     `https://api.giphy.com/v1/gifs/${imgId}?api_key=pnOiqSYN364PaAhhf34RpaEjgX20Ypl9`,
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       const title = json.data.title;
  //       const url = json.data.images.original.url;
  //       setImg({ url: url, title: title });
  //     })
  //     .catch((error) => console.log(error));
  // }, [imgId]);
  useEffect(() => {
    if (imgLoaded) return;

    setTimeout(
      () => {
        setImgLoaded(true);
        setImg({ title: `${imgId} loaded` });
        console.log(imgId + "loaded");
      },
      Math.floor(Math.random() * 2000),
    );
  }, [imgId, imgLoaded]);

  return (
    <div className="card" onClick={onClick(imgId)}>
      {/* <img src={img.url} alt={img.title} /> */}
      <h2>{img.title ?? "Loading..."}</h2>
    </div>
  );
}
