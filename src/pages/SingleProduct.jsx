import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { detailsProduct } from "../actions/productActions";
import Loader from "../components/Loader";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
   disabled
`;

const SingleProduct = () => {
  let { id } = useParams();
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetailsR);
  const { error, loading, product } = productDetails;

  const [qty, setQty] = useState(0);

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch]);

  const addQty = (e) => {
    e.preventDefault();
    console.log("add qty");
    if (qty + 1 <= product.stock) {
      setQty(qty + 1);
    }
  };
  const removeQty = (e) => {
    e.preventDefault();
    if (qty - 1 >= 0) {
      setQty(qty - 1);
    }
  };
  const addToCart = (e) => {
    e.preventDefault();

    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Eroor......</h1>
      ) : (
        <Wrapper>
          <ImgContainer>
            <Image src={`http://127.0.0.1:8000/${product.image}`} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.name}</Title>
            <Desc>{product.description}</Desc>
            <Price>৳ {product.price} </Price>
            <FilterContainer></FilterContainer>
            <AddContainer>
              {/* <button disabled={isAnonymous ? true : false}>Click</button> */}

              <AmountContainer>
                <Remove onClick={removeQty} />
                <Amount>{qty}</Amount>
                <Add onClick={addQty} />
              </AmountContainer>
              <Button disabled={qty <= 0 ? true : false} onClick={addToCart}>
                ADD TO CART
              </Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default SingleProduct;
