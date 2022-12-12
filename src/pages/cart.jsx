import { useRef } from "react";

import { useNavigate, Link } from "react-router-dom";
import useHead from "../hooks/useHead";
import { useAuth } from "../state/user";
import { useNotification } from "../state/notifications";
import { lengthCheck } from "../utils/pattern";
import { firebaseError } from "../utils/firebase-error";
import { formSpreeAction } from "../utils/formspree";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import CartTable from "../components/cart-table";
import Message from "../components/ui/message";
import Buttons from "../components/ui/button-group";
import PopUp from "../components/ui/pop-up";

export default function Cart() {
  const addressRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  useHead("Shopping cart ");
  const { cart, setCart, user, changeName, changeAddress } = useAuth();
  const { setMessage, setStatus, loading, setLoading, setModal } = useNotification();

  const total = cart.reduce((a, i) => a + Number(i.price), 0);

  const submitHandler = async (e) => {
    e.preventDefault();
    const address = addressRef.current?.value;
    const name = nameRef.current?.value;

    if (!lengthCheck(address, 6, 40)) {
      addressRef.current.focus();
      addressRef.current.classList.add("error");
      return;
    } else {
      addressRef.current.classList.remove("error");
    }

    if (!lengthCheck(name, 6, 40)) {
      nameRef.current.focus();
      nameRef.current.classList.add("error");
      return;
    } else {
      nameRef.current.classList.remove("error");
    }

    setModal(
      <PopUp message={`Order ${cart.length} items for $${total}`}>
        <button className="btn border btn-small" onClick={confirmOrder}>
          Confirm
        </button>
        <button className="btn border btn-small" onClick={() => setModal(null)}>
          Cancel
        </button>
      </PopUp>
    );

    async function confirmOrder() {
      setLoading(true);
      try {
        if (!user.displayName) await changeName(name);
        if (!user.photoURL) await changeAddress(address);

        const data = new FormData(e.target);
        data.append("email", user.email);
        const order = cart
          .reduce((a, i) => [...a, `name: ${i.name}\nPrice: ${i.price}`], [])
          .join("\n\n");
        data.append("order", order);
        data.append("total", total);

        await fetch(formSpreeAction, {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json"
          }
        });
        setCart([]);
        setMessage("Order successful");
        setStatus("success");
        navigate("/");
      } catch (error) {
        setMessage(firebaseError(error.message));
        setStatus("error");
      }
      setLoading(false);
    }
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
          <Message addClass="mb">
            We will send confirmation and order details to {user?.email}
          </Message>
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
              <button type="submit" className="btn border" disabled={loading}>
                Checkout
              </button>
              <button
                type="button"
                className="btn border"
                disabled={loading}
                onClick={() => navigate(-1)}>
                Back
              </button>
            </Buttons>
          </form>
        </>
      )}
    </Frame>
  );
}
