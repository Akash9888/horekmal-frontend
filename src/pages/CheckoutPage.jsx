import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart, saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  margin: 20px 0px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartR);
  const { shippingAddress } = cart;

  console.log(shippingAddress);

  const [name, setName] = useState(shippingAddress.receiverName);
  const [email, setEmail] = useState(shippingAddress.email);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [phone, setPhone] = useState(shippingAddress.phone);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        name,
        email,
        address,
        city,
        postalCode,
        country,
        phone,
      })
    );
    navigate("/payment");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Your Shipping Address</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your name"
            required
            value={name ? name : ""}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="Enter your Email"
            required
            value={email ? email : ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="Enter your address"
            value={address ? address : ""}
            required
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="Enter your city"
            value={city ? city : ""}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="Enter your postal code"
            value={postalCode ? postalCode : ""}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="Enter your country"
            value={country ? country : ""}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="Enter your phone number"
            value={phone ? phone : ""}
            // pattern="/^(?:(?:\+|00)88|01)?\d{11}$/"
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />

          <Button type="submit">Continue</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default CheckoutPage;
