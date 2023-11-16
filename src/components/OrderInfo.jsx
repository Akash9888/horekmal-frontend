import { Add, Delete, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useEffect } from "react";

const Container = styled.div`
  flex: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;

const ProductImage = styled.img`
  width: 100px;
  width: 100px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.span``;
const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
//----------------main----------------

const OrderInfo = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartR);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    console.log("OrderInfo triggered");
  }, []);

  return (
    <Container>
      {!cartItems ? (
        <>
          <h1>Empty cart</h1>
          <h3>Looks like you haven’t added anything to your cart yet</h3>
        </>
      ) : (
        <>
          {cartItems?.map((cartItem) => (
            <>
              <Wrapper cartItem={cartItem} key={cartItem.productId}>
                <ProductDetails>
                  <ProductImage
                    src={`http://127.0.0.1:8000/${cartItem.image}`}
                  />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {cartItem.name}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {cartItem.productId}
                    </ProductId>
                  </Details>
                </ProductDetails>
                <PriceDetails>
                  <ProductAmountContainer>
                    <Remove
                      onClick={(e) => {
                        if (cartItem.qty >= 1) {
                          const updated_qty = cartItem.qty - 1;
                          dispatch(addToCart(cartItem._id, updated_qty));
                        }
                      }}
                    />
                    <ProductAmount>{cartItem.qty}</ProductAmount>
                    <Add
                      onClick={(e) => {
                        const updated_qty = cartItem.qty + 1;
                        dispatch(addToCart(cartItem.productId, updated_qty));
                      }}
                    />
                    <Delete
                      onClick={(e) => {
                        alert("Are you sure you want to delete this cart?");
                        dispatch(removeFromCart(cartItem.productId));
                      }}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    ৳{" "}
                    {new Intl.NumberFormat("en-BD").format(
                      parseFloat(cartItem.price) * cartItem.qty
                    )}
                  </ProductPrice>
                </PriceDetails>
              </Wrapper>
              <hr />
            </>
          ))}
        </>
      )}
    </Container>
  );
};

export default OrderInfo;
