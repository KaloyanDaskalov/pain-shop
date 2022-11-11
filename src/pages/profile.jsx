import { useRef } from "react";
import { useAuth } from "../state/user";
import { useNotification } from "../state/notifications";
import { emailValidation, lengthCheck } from "../utils/pattern";
import { firebaseError } from "../utils/firebase-error";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import Message from "../components/ui/message";

export default function Profile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const { changeEmail, changePassword, user, logout } = useAuth();
  const { setMessage, setStatus, setLoading, loading } = useNotification();

  const changeEmailHandler = async (e) => {
    e.preventDefault();

    if (!emailValidation(emailRef.current?.value)) {
      emailRef.current.focus();
      emailRef.current.classList.add("error");
      return;
    } else {
      emailRef.current.classList.remove("error");
    }
    setLoading(true);
    try {
      await changeEmail(emailRef.current?.value);
      setMessage("Successfully change email to " + emailRef.current?.value);
      setStatus("success");
      await logout();
    } catch (error) {
      console.log(error);
      setMessage(firebaseError(error.message));
      setStatus("error");
    }
    setLoading(false);
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    if (!lengthCheck(passwordRef.current?.value, 6, 50, "\\S")) {
      passwordRef.current.focus();
      passwordRef.current.classList.add("error");
      return;
    } else {
      passwordRef.current.classList.remove("error");
    }

    if (passwordRef.current?.value !== confirmRef.current?.value) {
      confirmRef.current.focus();
      confirmRef.current.classList.add("error");
      return;
    } else {
      confirmRef.current.classList.remove("error");
    }

    setLoading(true);
    try {
      await changePassword(passwordRef.current?.value);
      setMessage("Successfully change password");
      setStatus("success");
      await logout();
    } catch (error) {
      console.log(error);
      setMessage(firebaseError(error.message));
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <Frame>
      <Title>Profile</Title>
      <Message>{user?.email}</Message>
      <form className="form" onSubmit={changeEmailHandler}>
        <input
          className="input"
          type="text"
          required
          placeholder="New Email"
          name="email"
          id="email"
          ref={emailRef}
        />
        <button type="submit" className="btn" disabled={loading}>
          Change Email
        </button>
      </form>
      <form className="form" onSubmit={changePasswordHandler}>
        <input
          className="input"
          type="password"
          required
          placeholder="New Password"
          name="password"
          id="password"
          ref={passwordRef}
        />
        <input
          className="input"
          type="password"
          required
          placeholder="Confirm Password"
          name="confirm"
          id="confirm"
          ref={confirmRef}
        />
        <Message>* Password must be at least 6 characters long</Message>
        <button type="submit" className="btn" disabled={loading}>
          Change Password
        </button>
      </form>
    </Frame>
  );
}
