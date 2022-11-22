import { useState, useEffect } from "react";
import { gallery } from "../firebase";
import { query, orderBy, getDocs } from "firebase/firestore";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import Spinner from "../components/ui/spinner";
import ImageSlider from "../components/carousel/image-slider";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    const q = query(gallery, orderBy("createdAt", "desc"));
    getDocs(q)
      .then((snap) => {
        const docs = [];
        snap.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        if (!ignore) setData(docs);
      })
      .catch(console.log);

    return () => (ignore = true);
  }, []);

  return (
    <Frame addClass="wide">
      <Title addClass="mb">Gallery</Title>
      {data ? <ImageSlider slides={data} /> : <Spinner />}
    </Frame>
  );
}
