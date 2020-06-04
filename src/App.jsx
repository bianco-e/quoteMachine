import React, { useState, useEffect } from "react";
import twitterLogo from "./images/twitterLogo.png";
import styled from "styled-components";

const getRandomNumber = (maxNum) => {
  return Math.floor(Math.random() * maxNum);
};
const getRandomColor = () => {
  return `rgb(${getRandomNumber(256)}, ${getRandomNumber(
    256
  )}, ${getRandomNumber(256)})`;
};

function App() {
  const [quote, setQuote] = useState("");
  const [randomColor, setRandomColor] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    const getQuote = () => {
      return fetch("http://localhost:5000/newQuote")
        .then((res) => res.json())
        .then((data) => {
          setQuote(data.result);
        });
    };
    getQuote();
    setRandomColor(getRandomColor());
  }, [triggerFetch]);

  return (
    <Wrapper color={randomColor}>
      <Quote>
        {quote ? <Text color={randomColor}>{quote}</Text> : "Cargando..."}
        <ButtonsGroup>
          <LinkButton
            href={`https://twitter.com/intent/tweet?text=${quote}`}
            target="blank"
          >
            <TwitterLogo src={twitterLogo}></TwitterLogo>
          </LinkButton>
          <Button
            onClick={() => {
              setTriggerFetch(!triggerFetch);
            }}
            color={randomColor}
          >
            Otra cita
          </Button>
        </ButtonsGroup>
      </Quote>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  backgroundColor: (props) => props.color,
  display: "flex",
  height: "100vh",
  justifyContent: "center",
});
const Quote = styled.div({
  backgroundColor: "whitesmoke",
  borderRadius: "5px",
  padding: "1%",
  textAlign: "center",
  width: "40%",
});
const Text = styled.h2({
  color: (props) => props.color,
  fontSize: "25px",
});
const ButtonsGroup = styled.section({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});
const LinkButton = styled.a({
  textDecoration: "none",
});
const Button = styled.button({
  background: "none",
  border: (props) => `1px solid ${props.color}`,
  color: (props) => props.color,
  borderRadius: "5px",
  cursor: "pointer",
  padding: "1%",
});
const TwitterLogo = styled.img({
  width: "20px",
});

export default App;
