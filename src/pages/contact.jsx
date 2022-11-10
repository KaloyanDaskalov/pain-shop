import { useRef } from "react";
import { lengthCheck, emailValidation } from "../utils/pattern";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import Message from "../components/ui/message";
import { BiMap, BiEnvelope, BiPhone } from "react-icons/bi";

export default function Contact() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const formHandler = async (e) => {
    e.preventDefault();
    if (!lengthCheck(nameRef.current?.value, 2, 50, "\\w")) {
      nameRef.current.focus();
      e.target.name.classList.add("error");
      return;
    } else {
      e.target.name.classList.remove("error");
    }
    if (!emailValidation(emailRef.current?.value)) {
      emailRef.current.focus();
      e.target.email.classList.add("error");
      return;
    } else {
      e.target.email.classList.remove("error");
    }
    if (!lengthCheck(messageRef.current?.value, 10, 500, "\\w")) {
      messageRef.current.focus();
      e.target.message.classList.add("error");
      return;
    } else {
      e.target.message.classList.remove("error");
    }
    console.log("Form spree");
  };

  return (
    <Frame>
      <Title>Contact Us</Title>
      <Message addClass="tl mb">
        <BiMap className="icon" />
        Sofia, Tsar Samuil 20
      </Message>
      <Message addClass="tl mb">
        <BiEnvelope className="icon" />
        paint-shop@gmail.com
      </Message>
      <Message addClass="tl mb">
        <BiPhone className="icon" />
        +359888222111
      </Message>
      <form className="form" onSubmit={formHandler}>
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
          placeholder="Email"
          name="email"
          id="email"
          ref={emailRef}
        />
        <textarea
          className="area"
          type="text"
          required
          placeholder="Message"
          name="message"
          id="message"
          ref={messageRef}
        />
        <Message addClass="tl mb">
          * Name must be at least 2 characters long{" "}
        </Message>
        <Message addClass="tl mb">
          * Message must be at least 10 characters long
        </Message>
        <button type="submit" className="btn">
          Send Message
        </button>
      </form>
    </Frame>
  );
}
