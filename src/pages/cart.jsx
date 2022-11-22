import useHead from "../hooks/useHead";

import { data } from "../utils/data";

import Frame from "../components/util/frame";
import Title from "../components/ui/title";
import Message from "../components/ui/message";
import Buttons from "../components/ui/button-group";

export default function Cart() {
  useHead("Shopping cart ");
  return (
    <Frame>
      <Title>Cart</Title>
      <table>
        <thead>
          <tr>
            <th>item</th>
            <th>name</th>
            <th>price</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={data[0].imageURL} alt="item" width="50" />
            </td>
            <td>{data[0].name}</td>
            <td>{data[0].price}</td>
            <td>delete</td>
          </tr>
        </tbody>
      </table>
      <Message>Total: 100</Message>
      <Buttons>
        <button className="btn border">Confirm</button>
        <button className="btn border">Back</button>
      </Buttons>
    </Frame>
  );
}
