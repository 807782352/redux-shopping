import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCart,
  totalCartPrice,
  totalCartQuantity,
} from "../store/cartSlice";

export default function NavbarPanel() {
  const cartProducts = useSelector(selectCart);
  const cartTotalQuantity = useSelector(totalCartQuantity);
  const cartTotalPrice = useSelector(totalCartPrice);
  console.log(cartProducts);

  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container fluid>
        <Nav.Link to="/" as={Link}>
          <Navbar.Brand>Redux Shopping</Navbar.Brand>
        </Nav.Link>
        <Nav.Link to="/" as={Link}>
          Products
        </Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav.Link to="/cart" as={Link}>
            My Bag: {cartTotalQuantity} - $ {cartTotalPrice}
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
