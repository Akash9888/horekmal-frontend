import React from "react";
import { styled } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import {
  AddShoppingCartOutlined,
  FavoriteBorderOutlined,
  VerticalAlignBottom,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  flex=1;
  display:flex;
  align-items:center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin-right: 5px;
`;

const SeacrchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  marigin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
`;
const Center = styled.div`flex=1;text-align:center;`;
const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`flex=1;display:flex;align-items:center;justify-content:flex-end;`;
const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartR);
  const { cartItems } = cart;

  const loginUserInfo = useSelector((state) => state.userLoginR);
  const { userInfo } = loginUserInfo;

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SeacrchContainer>
            <Input />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SeacrchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>HorekMal</Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/products">
            <MenuItems>Products</MenuItems>
          </Link>

          {userInfo ? (
            <>
              <Link to="/profile">
                <MenuItems>{userInfo?.user?.name}</MenuItems>
              </Link>
              <Link>
                <MenuItems onClick={handleLogout}>Logout</MenuItems>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-up">
                <MenuItems>Register</MenuItems>
              </Link>
              <Link to="/sign-in">
                <MenuItems>Sign In</MenuItems>
              </Link>
            </>
          )}

          <Link to="/cart">
            <MenuItems>
              <Badge badgeContent={4} color="primary">
                <FavoriteBorderOutlined />
              </Badge>
            </MenuItems>
          </Link>

          <Link to="cart">
            <MenuItems>
              <Badge badgeContent={cartItems?.length} color="primary">
                <AddShoppingCartOutlined />
              </Badge>
            </MenuItems>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
