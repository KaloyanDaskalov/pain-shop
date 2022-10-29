import { useRef } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";

export default function Home() {
  const messageRef = useRef();
  const db = collection(firestore, "messages");

  const submitHandler = (e) => {
    e.preventDefault();
    if (messageRef.current.value) {
      try {
        addDoc(db, { message: messageRef.current.value });
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div>
      <p>Welcome to Paint Shop app</p>
      <form onSubmit={submitHandler}>
        <label htmlFor="message">Add message</label>
        <input type="text" id="message" name="message" ref={messageRef} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
