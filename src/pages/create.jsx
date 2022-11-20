import { useRef, useState } from "react";
import { bucketUrl, gallery } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "@firebase/storage";
import { addDoc, serverTimestamp } from "@firebase/firestore";
import { useNotification } from "../state/notifications";
import { lengthCheck } from "../utils/pattern";

import { BiUpload } from "react-icons/bi";
import Frame from "../components/util/frame";
import Title from "../components/ui/title";

const types = ["image/png", "image/jpeg", "image/webp", "image/avif"];

export default function Create() {
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const [file, setFile] = useState(null);

  const { setMessage, setStatus, setLoading, loading } = useNotification();

  const uploadHandler = (e) => {
    e.preventDefault();
    const selected = e.target.files[0];

    if (selected && types.includes(selected?.type)) {
      setFile(selected);
    } else {
      setFile(null);
      setMessage("Invalid file");
      setStatus("error");
      return;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!lengthCheck(nameRef.current?.value, 2, 50)) {
      nameRef.current.focus();
      nameRef.current.classList.add("error");
      return;
    } else {
      nameRef.current.classList.remove("error");
    }

    if (!lengthCheck(priceRef.current?.value, 1, 6, "\\d")) {
      priceRef.current.focus();
      priceRef.current.classList.add("error");
      return;
    } else {
      priceRef.current.classList.remove("error");
    }

    if (!lengthCheck(descriptionRef.current?.value, 10, 100)) {
      descriptionRef.current.focus();
      descriptionRef.current.classList.add("error");
      return;
    } else {
      descriptionRef.current.classList.remove("error");
    }

    if (!file) {
      setMessage("Select an image");
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      const storageRef = ref(bucketUrl, `gallery/${file.name}`);
      await uploadBytes(storageRef, file);
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
      setFile(null);
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
        <section className="input-file">
          <input
            type="file"
            required
            placeholder="Image"
            name="image"
            id="image"
            onChange={uploadHandler}
          />
          <label htmlFor="image">
            <BiUpload className="icon" />
            <span>{file?.name || "No file selected."}</span>
          </label>
        </section>
        <button type="submit" className="btn" disabled={loading}>
          Add
        </button>
      </form>
    </Frame>
  );
}
