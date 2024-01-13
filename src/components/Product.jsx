import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProducts } from "../store/productSlice";
import { useEffect } from "react";
import StatusCode from "../utils/StatusCode";
import ProductItem from "./ProductItem";

export default function Product() {
  const { data: products, status, error } = useSelector(getAllProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    // api
    // fetch("https://fakestoreapi.com/products")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data));

    // dispatch an action
    if (status == StatusCode.IDLE) {
      dispatch(getProducts());
    }
  }, [dispatch, status]);

  if (status === StatusCode.LOADING) {
    return <p> Loading.... </p>;
  }

  if (status === StatusCode.FAILED) {
    return (
      <>
        <Alert key="danger" variant="danger">
          Something went wrong!! Please try again later
        </Alert>
        <Alert key="info" variant="danger">
          {error}
        </Alert>
      </>
    );
  }

  const cards = products.map((product) => (
    <ProductItem product={product} type="add" key={product.id} />
  ));

  // ELSE IF statusCode = "successed"
  return (
    <div className="">
      <h1 className="text-center">Product DashBoard</h1>
      {/* {JSON.stringify(products)} */}
      <div className="row">{cards}</div>
    </div>
  );
}
