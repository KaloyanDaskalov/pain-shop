import { useState, useEffect } from "react";
import { gallery } from "../firebase";
import { query, orderBy, getDocs } from "firebase/firestore";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
// import Carousel from "../components/carousel";
import ImageSlider from "../components/carousel/image-slider";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const q = query(gallery, orderBy("createdAt", "desc"));
    getDocs(q)
      .then((snap) => {
        const docs = [];
        snap.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setData(docs);
      })
      .catch(console.log);
  }, []);

  return (
    <Frame addClass="wide">
      <Title>Gallery</Title>
      <ImageSlider slides={data} />
      {/* <Carousel>
        {data?.map((i) => (
          <img key={i.id} src={i.imageURL} alt="painting view" />
        ))}
      </Carousel> */}
    </Frame>
  );
}
