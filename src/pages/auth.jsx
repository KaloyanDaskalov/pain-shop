import { useRef, useState } from "react";
import { useAuth } from "../state/user";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import Message from "../components/ui/message";
import TextButton from "../components/ui/text-button";

export default function Auth() {
  const [form, setForm] = useState("Login");
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const { register, login, user, logout } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("email", emailRef.current?.value);
    console.log("password", passwordRef.current?.value);
    console.log("confirm", confirmRef.current?.value);
    try {
      switch (form) {
        case "Register":
          await register(
            emailRef.current?.value?.trim(),
            passwordRef.current?.value?.trim()
          );
          break;
        case "Login":
          await login(emailRef.current?.value, passwordRef.current?.value);
          break;
        default:
          console.log("Unsupported form");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeFormHandler = (e) => {
    setForm(e.target.textContent);
  };
  return (
    <Frame>
      <Title>{form}</Title>
      <form className="form" onSubmit={submitHandler}>
        <input
          className="input"
          type="text"
          required
          placeholder="Email"
          name="email"
          id="email"
          ref={emailRef}
        />
        {form !== "Reset Password" && (
          <input
            className="input"
            type="password"
            required
            placeholder="Password"
            name="password"
            id="password"
            ref={passwordRef}
          />
        )}
        {form === "Register" && (
          <input
            className="input"
            type="password"
            required
            placeholder="Confirm Password"
            name="confirm"
            id="confirm"
            ref={confirmRef}
          />
        )}
        <button type="submit" className="btn">
          {form}
        </button>
      </form>
      {form === "Login" && (
        <Message>
          Not a member?
          <TextButton click={changeFormHandler}>Register</TextButton>
        </Message>
      )}
      {form === "Register" && (
        <Message>
          Already a member?
          <TextButton
            type="button"
            className="form-button-navigator"
            click={changeFormHandler}
          >
            Login
          </TextButton>
        </Message>
      )}
      {form !== "Reset Password" && (
        <Message>
          Don't remember your password?
          <TextButton
            type="button"
            className="form-button-navigator"
            click={changeFormHandler}
          >
            Reset Password
          </TextButton>
        </Message>
      )}
      {form === "Reset Password" && (
        <Message>
          Back to
          <TextButton
            type="button"
            className="form-button-navigator"
            click={changeFormHandler}
          >
            Login
          </TextButton>
        </Message>
      )}
      {user && (
        <p>
          {user.email} <button onClick={logout}>Sign out</button>
        </p>
      )}
    </Frame>
  );
}
