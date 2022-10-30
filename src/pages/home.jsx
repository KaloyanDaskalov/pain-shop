import { useRef } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";

// login/register
import Frame from "../components/util/frame";
import Title from "../components/ui/title";
// import NavLink from "../components/ui/nav-link";
import Message from "../components/ui/message";
import { Link } from "react-router-dom";

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
    <>
      <Frame>
        <Title>Login</Title>
        <form className="form">
          <input
            className="input"
            type="text"
            required
            placeholder="Email"
            name="email"
            id="email"
          />
          <input
            className="input"
            type="text"
            required
            placeholder="Password"
            name="password"
            id="password"
          />
          <input
            className="input"
            type="text"
            required
            placeholder="Confirm Password"
            name="confirm"
            id="confirm"
          />
          <button type="submit" className="btn border">
            Login
          </button>
        </form>
        <Message>
          Not a member?{" "}
          <Link to="/register" addClass="nested">
            Sign Up Now
          </Link>
        </Message>
      </Frame>
      {/* <form onSubmit={submitHandler}>
        <label htmlFor="message">Add message</label>
        <input type="text" id="message" name="message" ref={messageRef} />
        <button type="submit">Add</button>
      </form> */}
    </>
  );
}
