import { useRef } from "react";
import { useAuth } from "../state/user";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";
import Frame from "../components/util/frame";
import Title from "../components/ui/title";

export default function Home() {
  const messageRef = useRef();
  const { user } = useAuth();

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
    <Frame>
      <Title>Home {user?.email}</Title>
      <form onSubmit={submitHandler}>
        <label htmlFor="message">Add message</label>
        <input type="text" id="message" name="message" ref={messageRef} />
        <button type="submit">Add</button>
      </form>
    </Frame>
  );
}

/*
  import { firestore } from "../firebase";
  import { addDoc, collection } from "@firebase/firestore";

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

  <form onSubmit={submitHandler}>
    <label htmlFor="message">Add message</label>
    <input type="text" id="message" name="message" ref={messageRef} />
    <button type="submit">Add</button>
  </form>
*/
