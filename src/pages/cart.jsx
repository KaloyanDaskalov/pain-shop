import { Link } from "react-router-dom";
import useHead from "../hooks/useHead";
import { useAuth } from "../state/user";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import CartTable from "../components/cart-table";
import Message from "../components/ui/message";
import Buttons from "../components/ui/button-group";

export default function Cart() {
  useHead("Shopping cart ");
  const { cart, setCart } = useAuth();

  const total = cart.reduce((a, i) => a + Number(i.price), 0);

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
          <Buttons>
            <button className="btn border">Confirm</button>
            <button className="btn border">Back</button>
          </Buttons>
        </>
      )}
    </Frame>
  );
}
