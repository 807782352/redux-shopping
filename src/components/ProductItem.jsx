import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  addQuantity,
  getCurrQuantityById,
  minusQuantity,
  removeCart,
} from "../store/cartSlice";
import { Button, Card } from "react-bootstrap";

export default function ProductItem({ product, type }) {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    const newProduct = {
      ...product,
      quantity: 1,
      totalPrice: product.price * 1,
    };

    // dispatch an add action
    dispatch(addCart(newProduct));
  };

  const removeToCart = (id) => {
    dispatch(removeCart(id));
  };

  const decreaseItem = (id) => dispatch(minusQuantity(id));

  const increaseItem = (id) => dispatch(addQuantity(id));

  const getCurrQuantity = useSelector(getCurrQuantityById(product.id));

  const content =
    getCurrQuantity > 0 ? (
      <div className="d-flex justify-content-center align-items-center ">
        <Button variant="primary" onClick={() => decreaseItem(product.id)}>
          -
        </Button>
        <span className="mx-2">{getCurrQuantity}</span>
        <Button variant="primary" onClick={() => increaseItem(product.id)}>
          +
        </Button>

        {type === "delete" && (
          <Button
            variant="danger"
            onClick={() => removeToCart(product.id)}
            className="mx-2"
          >
            Delete Item
          </Button>
        )}
      </div>
    ) : (
      type === "add" && (
        <Button variant="primary" onClick={() => addToCart(product)}>
          Add To Cart
        </Button>
      )
    );

  return (
    <div
      className=" col-md-3 text-center "
      key={product.id}
      style={{ marginBottom: "10px" }}
    >
      <Card className="h-100">
        <div className="">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ height: "130px", width: "100px", marginTop: "10px" }}
          />
        </div>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>CAD: {product.price}</Card.Text>
        </Card.Body>
        
        {content}
      </Card>
    </div>
  );
}
