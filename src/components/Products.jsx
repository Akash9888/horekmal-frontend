import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productListR);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <Container>
      {loading ? (
        <h1>Loading..............</h1>
      ) : error ? (
        <h1>Eroor......</h1>
      ) : (
        <>
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </>
      )}
    </Container>
  );
};

export default Products;
