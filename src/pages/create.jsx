import { useRef } from "react";
import { bucketUrl, gallery } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "@firebase/storage";
import { addDoc, serverTimestamp } from "@firebase/firestore";
import { useNotification } from "../state/notifications";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";

const types = ["image/png", "image/jpeg", "image/webp", "image/avif"];

export default function Create() {
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const { setMessage, setStatus, setLoading, loading } = useNotification();

  const submitHandler = async (e) => {
    e.preventDefault();
    const selected = imageRef.current.files[0];

    if (selected && types.includes(selected.type)) {
      imageRef.current.classList.remove("error");
    } else {
      imageRef.current.classList.add("error");
      setMessage("Invalid file");
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      const storageRef = ref(bucketUrl, `gallery/${selected.name}`);
      await uploadBytes(storageRef, selected);
      const url = await getDownloadURL(storageRef);
      await addDoc(gallery, {
        name: nameRef.current.value,
        price: priceRef.current.value,
        description: descriptionRef.current.value,
        imageURL: url,
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      setMessage(`Successfully created ${nameRef.current.value} item`);
      setStatus("success");
      e.target.reset();
    } catch (e) {
      setLoading(false);
      setMessage(e.message);
      setStatus("error");
    }
  };

  return (
    <Frame>
      <Title>Add Painting</Title>
      <form onSubmit={submitHandler}>
        <input
          className="input"
          type="text"
          required
          placeholder="Name"
          name="name"
          id="name"
          ref={nameRef}
        />
        <input
          className="input"
          type="text"
          required
          placeholder="Price"
          name="price"
          id="price"
          ref={priceRef}
        />
        <textarea
          className="area"
          type="text"
          required
          placeholder="Description"
          name="description"
          id="description"
          ref={descriptionRef}
        />
        <input
          className="input"
          type="file"
          required
          placeholder="Image"
          name="image"
          id="image"
          ref={imageRef}
        />
        <button type="submit" className="btn" disabled={loading}>
          Add
        </button>
      </form>
    </Frame>
  );
}
