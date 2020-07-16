import React from "react";
import styled from "styled-components";

const ChangingButton = ({ content, color, changeButton }) => {
  const showContent = () => {
    if (content.length > 1) {
      return (
        <>
          <Text>Texto: "{content[2]}."</Text>
          <Text>
            {content[0]} - {content[1]}° año
          </Text>
          <Link target="blank" href={content[3]} color={color}>
            Ir al texto
          </Link>
        </>
      );
    } else {
      return <p>{content[0]}</p>;
    }
  };

  return (
    <Button onClick={() => changeButton()} color={color}>
      {showContent()}
    </Button>
  );
};

const Button = styled.button({
  border: "none",
  backgroundColor: "whitesmoke",
  color: (props) => props.color,
  fontSize: "24px",
  cursor: "pointer",
});
const Text = styled.p({
  fontSize: "19px",
});
const Link = styled.a({
  zIndex: "2",
  textDecoration: "none",
  fontSize: "17px",
  color: (props) => props.color,
  textShadow: "1px 1px 1px grey",
  ["&:visited"]: {
    textDecoration: "none",
    color: (props) => props.color,
  },
  ["&:hover"]: {
    textDecoration: "none",
    color: (props) => props.color,
    textShadow: "1px 1px 5px grey",
  },
});

export default ChangingButton;
