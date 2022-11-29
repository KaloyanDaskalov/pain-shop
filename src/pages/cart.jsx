import { useRef } from "react";

import { useNavigate, Link } from "react-router-dom";
import useHead from "../hooks/useHead";
import { useAuth } from "../state/user";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import CartTable from "../components/cart-table";
import Message from "../components/ui/message";
import Buttons from "../components/ui/button-group";

//Order page, check name and address

export default function Cart() {
  const addressRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  useHead("Shopping cart ");
  const { cart, setCart, user } = useAuth();

  const total = cart.reduce((a, i) => a + Number(i.price), 0);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(addressRef.current.value);
    console.log(emailRef.current.value);
  };

  const deleteItemHandler = (id) => {
    const newCart = cart.filter((i) => i.id !== id);
    setCart(newCart);
  };

  return (
    <Frame>
      <Title>Cart</Title>
      {cart.length === 0 ? (
        <>
          <Message addClass="mb">Cart is empty.</Message>
          <Link to="/" className="btn">
            Back to shopping
          </Link>
        </>
      ) : (
        <>
          <CartTable items={cart} removeItem={deleteItemHandler} />
          <Message addClass="mb">Total: {total}$</Message>
          <form onSubmit={submitHandler}>
            <input
              defaultValue={user ? user.displayName : ""}
              className="input"
              type="text"
              required
              placeholder="First and Last name"
              name="name"
              id="name"
              ref={nameRef}
            />
            <input
              defaultValue={user ? user.photoURL : ""}
              className="input"
              type="text"
              required
              placeholder="Shipping address"
              name="address"
              id="address"
              ref={addressRef}
            />
            <Buttons>
              <button type="submit" className="btn border">
                Confirm
              </button>
              <button type="button" className="btn border" onClick={() => navigate(-1)}>
                Back
              </button>
            </Buttons>
          </form>
        </>
      )}
    </Frame>
  );
}
