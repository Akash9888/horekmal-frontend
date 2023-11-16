import {
  Call,
  Email,
  Facebook,
  Home,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  //   padding: 20px;
  //   //   align-items: start;
  //   justify-content: space-between;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>HorekMal.</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          quaerat libero ad repudiandae natus nam. Ullam omnis quis dolore
          alias.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="FF0000">
            <YouTube />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Usefull Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms & Conditions</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact Us</Title>
        <ContactItem>
          <Home style={{ marginRight: "10px" }} />
          Shibgonj, Sylhet, Bangladesh
        </ContactItem>
        <ContactItem>
          <Call style={{ marginRight: "10px" }} />
          +880 177......
        </ContactItem>
        <ContactItem>
          <Email style={{ marginRight: "10px" }} />
          contact@horemal.com
        </ContactItem>
        <Payment src="https://cscwebsite.com/wp-content/uploads/2018/09/paypal-1.png" />
      </Right>
    </Container>
  );
};

export default Footer;
