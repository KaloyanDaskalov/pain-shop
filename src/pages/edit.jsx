import { useRef, useState, useEffect } from "react";
import { bucketUrl, gallery } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "@firebase/storage";
import { getDoc, updateDoc, doc } from "@firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { useNotification } from "../state/notifications";
import { lengthCheck } from "../utils/pattern";
import { firebaseError } from "../utils/firebase-error";

import { BiUpload } from "react-icons/bi";
import Frame from "../components/util/frame";
import Title from "../components/ui/title";

const types = ["image/png", "image/jpeg", "image/webp", "image/avif"];

export default function Edit() {
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const [file, setFile] = useState(null);
  const [fileLoc, setFileLoc] = useState(null);
  const navigate = useNavigate();
  const { itemID } = useParams();

  const { setMessage, setStatus, setLoading, loading } = useNotification();

  useEffect(() => {
    let ignore = false;

    const docRef = doc(gallery, itemID);
    getDoc(docRef)
      .then((snap) => {
        if (!ignore && snap) {
          const item = snap.data();
          nameRef.current.value = item.name;
          priceRef.current.value = item.price;
          descriptionRef.current.value = item.description;
          setFileLoc(item.imageLoc);
        }
      })
      .catch(console.log);

    return () => (ignore = true);
  });

  const uploadHandler = (e) => {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
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

    setLoading(true);
    const item = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value
    };
    if (file) {
      try {
        const storageRef = ref(bucketUrl, fileLoc);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        item.url = url;
      } catch (error) {
        setLoading(false);
        setMessage(firebaseError(e.setMessage));
        setStatus("error");
        return;
      }
    }
    try {
      const docRef = doc(gallery, itemID);
      await updateDoc(docRef, item);
      setLoading(false);
      setMessage(`Successfully edited "${nameRef.current.value}" item`);
      setStatus("success");
      setFile(null);
      e.target.reset();
      navigate("/");
    } catch (e) {
      setLoading(false);
      setMessage(firebaseError(e.setMessage));
      setStatus("error");
    }
  };

  return (
    <Frame>
      <Title>Edit Item</Title>
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
          <input type="file" placeholder="Image" name="image" id="image" onChange={uploadHandler} />
          <label htmlFor="image">
            <BiUpload className="icon" />
            <span>{file?.name || "No file selected."}</span>
          </label>
        </section>
        <button type="submit" className="btn" disabled={loading}>
          Edit
        </button>
      </form>
    </Frame>
  );
}
