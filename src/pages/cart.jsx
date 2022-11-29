import { useRef } from "react";

import { useNavigate, Link } from "react-router-dom";
import useHead from "../hooks/useHead";
import { useAuth } from "../state/user";
// import { useNotification } from "../state/notifications";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import CartTable from "../components/cart-table";
import Message from "../components/ui/message";
import Buttons from "../components/ui/button-group";

//TODO modal shipment, delete and images, order page

export default function Cart() {
  const addressRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  useHead("Shopping cart ");
  const { cart, setCart, user } = useAuth();
  // const { setModal } = useNotification();

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

  // const showPictureHandler = (url) => {
  //   setModal(<img className="img" src={url} alt="Painting" />);
  // };

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
              // defaultValue={user ? user.email : ""}
              className="input"
              type="text"
              required
              placeholder="First and Last name"
              name="name"
              id="name"
              ref={nameRef}
            />
            <input
              defaultValue={user ? user.email : ""}
              className="input"
              type="text"
              required
              placeholder="Email"
              name="email"
              id="email"
              ref={emailRef}
            />
            <input
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

/*
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
          type="text"
          required
          placeholder="Price"
          name="price"
          id="price"
          ref={priceRef}
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
        <section className="input-file">
          <input
            type="file"
            required
            placeholder="Image"
            name="image"
            id="image"
            onChange={uploadHandler}
          />
          <label htmlFor="image">
            <BiUpload className="icon" />
            <span>{file?.name || "No file selected."}</span>
          </label>
        </section>
        <button type="submit" className="btn" disabled={loading}>
          Add
        </button>
      </form>
*/
