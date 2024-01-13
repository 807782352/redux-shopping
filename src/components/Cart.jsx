import { useSelector } from "react-redux";
import { selectCart } from "../store/cartSlice";
import { Alert } from "react-bootstrap";
import ProductItem from "./ProductItem";

export default function Cart() {
  const { cart: productCart } = useSelector(selectCart);

  if (productCart.length === 0) {
    return (
      <Alert key="primary" variant="primary" className="mt-5">
        Please add some new items into the cart !!!
      </Alert>
    );
  }

  const cards = productCart.map((product) => (
    <ProductItem product={product} type="delete" key={product.id} />
  ));

  return (
    <div className="text-center">
      <h1>Cart Overview</h1>
      <div className="row">{cards}</div>
    </div>
  );
}
