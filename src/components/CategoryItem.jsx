import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  position: relative;
  margin: 3px;
  height: 70vh;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  marging-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ category }) => {
  return (
    <Container>
      <Image src={category.img} />
      <Info>
        <Title>{category.title}</Title>

        <Button>SHOP NOW</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;