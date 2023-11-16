import {
  AddShoppingCartOutlined,
  FavoriteBorderOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  trasition: all 0.5s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #dcfaf4;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;

  transition: all 0.5s ease;

  &:hover {
    background-color: #dee0df;
    transform: scale(1.1);
  }
`;

const Product = ({ product }) => {
  console.log(product);
  return (
    <Container>
      <Circle />
      <Image src={`http://127.0.0.1:8000/${product.image}`} />

      <Info>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>

        <Icon>
          <Link to={`/products/${product._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>

        <Icon>
          <AddShoppingCartOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
