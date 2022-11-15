import { useRef } from "react";
import { storage } from "../firebase";
import { uploadBytes } from "@firebase/storage";
// import { gallery } from "../firebase";
// import { addDoc } from "@firebase/firestore";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";

//TODO image upload func

export default function Create() {
  const nameRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(nameRef.current?.value);
    console.log(imageRef.current?.files[0].name);
    console.log(descriptionRef.current?.value);
    uploadBytes(storage, imageRef.current?.files[0]);
    // if (messageRef.current.value) {
    //   try {
    //     addDoc(gallery, { message: messageRef.current.value });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
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
          type="file"
          required
          placeholder="Image"
          name="image"
          id="image"
          ref={imageRef}
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
        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </Frame>
  );
}
