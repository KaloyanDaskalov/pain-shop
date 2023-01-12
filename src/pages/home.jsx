import { useState, useEffect, useReducer } from "react";
import { useNotification } from "../state/notifications";
import { gallery } from "../firebase";
import { query, orderBy, getDocs } from "firebase/firestore";

import placeholderImage from "../assets/images/placeholder.jpg";
import Frame from "../components/util/frame";
import Title from "../components/ui/title";
// import Spinner from "../components/ui/spinner";
import ImageSlider from "../components/carousel/image-slider";

export default function Home() {
  const [data, setData] = useState([
    {
      price: "0",
      createdAt: "2022-11-21T10:09:53.548Z",
      imageURL: placeholderImage,
      description: "..................",
      name: "Loading...",
      id: 1
    }
  ]);
  const [update, forceUpdate] = useReducer((num) => num + 1, 0);
  const { setLoading } = useNotification();

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    const q = query(gallery, orderBy("createdAt", "desc"));
    getDocs(q)
      .then((snap) => {
        const docs = [];
        snap.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        if (!ignore) setData(docs);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });

    return () => (ignore = true);
  }, [update, setLoading]);

  return (
    <Frame addClass="wide">
      <Title addClass="mb">Gallery</Title>
      <ImageSlider slides={data} forceUpdate={forceUpdate} />
    </Frame>
  );
}
