import { useRef } from "react";
import { useAuth } from "../state/user";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import Message from "../components/ui/message";
// import TextButton from "../components/ui/text-button";

export default function Profile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const { changeEmail, changePassword, user, logout } = useAuth();

  const changeEmailHandler = async (e) => {
    e.preventDefault();
    console.log("Email", emailRef.current?.value);

    try {
      await changeEmail(emailRef.current?.value);
    } catch (error) {
      console.log(error);
    }
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    console.log(
      "Passwords",
      passwordRef.current?.value,
      confirmRef.current?.value
    );

    try {
      await changePassword(passwordRef.current?.value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Frame>
      <Title>Profile</Title>
      <Message>{user?.email}</Message>
      <button type="submit" className="btn" onClick={logout}>
        Logout
      </button>
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
        <button type="submit" className="btn">
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
        <Message>* Password must be 6 to 15 characters long</Message>
        <button type="submit" className="btn">
          Change Password
        </button>
      </form>
    </Frame>
  );
}
