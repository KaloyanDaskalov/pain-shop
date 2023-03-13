import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/user";
import { useNotification } from "../state/notifications";
import { firebaseError } from "../utils/firebase-error";
import { lengthCheck, emailValidation } from "../utils/pattern";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import Message from "../components/ui/message";
import TextButton from "../components/ui/text-button";

export default function Auth() {
  const [form, setForm] = useState("Login");
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  const { register, login, resetPassword } = useAuth();
  const { setMessage, setStatus, setLoading, loading } = useNotification();

  const submitHandler = async (e) => {
    e.preventDefault();

    let formType = resetPassword;
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    const confirm = confirmRef.current?.value.trim();

    if (!emailValidation(email)) {
      emailRef.current.focus();
      emailRef.current.classList.add("error");
      return;
    } else {
      emailRef.current.classList.remove("error");
    }

    if ((form === "Register" || form === "Login") && !lengthCheck(password, 6, 50, "\\S")) {
      passwordRef.current.focus();
      passwordRef.current.classList.add("error");
      return;
    } else if (form !== "Reset Password") {
      passwordRef.current.classList.remove("error");
    }

    if (form === "Register") {
      if (passwordRef.current?.value !== confirm) {
        confirmRef.current.focus();
        confirmRef.current.classList.add("error");
        return;
      } else {
        confirmRef.current.classList.remove("error");
      }
      formType = register;
    } else if (form === "Login") {
      formType = login;
    }

    setLoading(true);
    try {
      const res = await formType(email, password);
      if (res) {
        setMessage(`Welcome ${res.user?.email}`);
        setStatus("success");
      } else {
        setMessage("Check your email (inbox or spam) and follow instructions");
        setStatus("success");
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      setMessage(firebaseError(error.message));
      setStatus("error");
      setLoading(false);
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
          <>
            <input
              className="input"
              type="password"
              required
              placeholder="Confirm Password"
              name="confirm"
              id="confirm"
              ref={confirmRef}
            />
            <Message addClass="tl mb">* Password must be at least 6 characters long</Message>
          </>
        )}
        <button type="submit" className="btn" disabled={loading}>
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
          <TextButton type="button" className="form-button-navigator" click={changeFormHandler}>
            Login
          </TextButton>
        </Message>
      )}
      {form !== "Reset Password" && (
        <Message>
          Don't remember your password?
          <TextButton type="button" className="form-button-navigator" click={changeFormHandler}>
            Reset Password
          </TextButton>
        </Message>
      )}
      {form === "Reset Password" && (
        <Message>
          Back to
          <TextButton type="button" className="form-button-navigator" click={changeFormHandler}>
            Login
          </TextButton>
        </Message>
      )}
    </Frame>
  );
}
