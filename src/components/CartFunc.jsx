import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartFunc = ({ dispatch, cartItem }) => {
  // const dispatch = useDispatch();

  //const [qty, setQty] = useState(cartItem.qty);

  const handleDelete = (id) => {
    console.log("Delete");
    dispatch(removeFromCart(id));
  };
  const handleUpdate = (id, val) => {
    let qty;
    if (val == "minus") {
      qty = cartItem.qty;
      qty--;
    } else {
      qty = cartItem.qty;
      qty++;
    }
    dispatch(addToCart(id, qty));
  };
  return (
    <Grid container className="flex items-center justify-between mt-2 ">
      <Grid item xs={2}>
        <Box
          component="img"
          alt="The house from the offer."
          className="w-20 h-20 border-2 border-indigo-600 border-solid rounded-full "
          src={`http://127.0.0.1:8000/${cartItem.image}`}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle2">
          {/* {orderItem.name} */}
          <Link to={`/products/${cartItem.productId}`} className="no-underline">
            {cartItem.name}
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <div className="flex items-center justify-center p-1 ">
          <IconButton
            aria-label="minus"
            size="small"
            disabled={cartItem.qty <= 1}
          >
            <span
              onClick={() => {
                if (cartItem.qty > 1) {
                  handleUpdate(cartItem.productId, "minus");
                }
              }}
            >
              <Remove />
            </span>
          </IconButton>
          <Typography className="inline mx-1">{cartItem.qty}</Typography>

          <IconButton size="small" aria-label="plus">
            <Add
              onClick={() => {
                handleUpdate(cartItem.productId, "plus");
              }}
            />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={3}>
        <Typography className="inline mx-2">
          <span>{cartItem.qty}</span> x <span>{cartItem.price}</span> ={" "}
          <span>
            ৳{" "}
            {new Intl.NumberFormat("en-BD").format(
              parseFloat(cartItem.price) * cartItem.qty
            )}
          </span>
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Remove from Cart">
          <IconButton>
            <Delete
              onClick={() => {
                handleDelete(cartItem.productId);
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default CartFunc;
