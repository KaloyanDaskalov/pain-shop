import classes from "./cart-table.module.css";
import { MdDeleteForever } from "react-icons/md";

const headings = ["item", "name", "price", "action"];

export default function CartTable({ items = [], removeItem }) {
  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.heading}>
          {headings.map((i) => (
            <th key={i} className={classes.cell}>
              {i}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((i) => (
          <tr key={i.id} className={classes.row}>
            <td>
              <img src={i.imageURL} alt="item" className={classes.image} />
            </td>
            <td>{i.name}</td>
            <td>{i.price}</td>
            <td>
              <MdDeleteForever className={classes.icon} onClick={() => removeItem(i.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
