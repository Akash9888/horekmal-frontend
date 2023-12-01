import { Alert, AlertTitle, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <Alert severity="error">
      <AlertTitle>Your Cart is Empty!</AlertTitle>
      Want to Buy Somethings —{" "}
      <strong>
        <Button
          onClick={() => {
            navigate("/products");
          }}
        >
          Shop Now
        </Button>
      </strong>
    </Alert>
  );
};

export default EmptyCart;
