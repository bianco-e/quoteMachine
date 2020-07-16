import React, { useState, useEffect } from "react";
import twitterLogo from "./images/twitterLogo.png";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { getRandomColor } from "./utils.js";
import ChangingButton from "./components/ChangingButton";
import SyncLoader from "react-spinners/SyncLoader";

function App() {
  const [quote, setQuote] = useState("");
  const [quoteDetails, setQuoteDetails] = useState("");
  const [randomColor, setRandomColor] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const getQuote = () => {
      return fetch("http://localhost:5000/newQuote")
        .then((res) => res.json())
        .then((data) => {
          const { quote, author, subject, carrerYear, text } = data;
          const { name, link } = text;
          setQuote(`'${quote}' - ${author}`);
          setQuoteDetails([subject, carrerYear, name, link]);
        });
    };
    getQuote();
    setRandomColor(getRandomColor());
  }, [triggerFetch]);

  const history = useHistory();

  const changeButton = () => {
    setShowDetails(!showDetails);
  };

  const contentToShow = () => {
    if (showDetails) {
      return (
        <ChangingButton
          changeButton={changeButton}
          color={randomColor}
          content={quoteDetails}
        />
      );
    } else {
      return (
        <ChangingButton
          changeButton={changeButton}
          color={randomColor}
          content={[quote]}
        />
      );
    }
  };

  return (
    <Wrapper color={randomColor}>
      <Container>
        {quote ? contentToShow() : <SyncLoader size={30} color={randomColor} />}
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
      </Container>
      <Button
        onClick={() => history.push("/nuevacita")}
        bgColor={randomColor}
        color="whitesmoke"
      >
        Contribuí con una cita
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "100vh",
  backgroundColor: (props) => props.color,
});
const Container = styled.div({
  backgroundColor: "whitesmoke",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textAlign: "center",
  borderRadius: "5px",
  padding: "1%",
  width: "40%",
  minHeight: "50vh",
});
const ButtonsGroup = styled.div({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});
const LinkButton = styled.a({
  textDecoration: "none",
});
const Button = styled.button({
  backgroundColor: (props) => props.bgColor || "whitesmoke",
  border: (props) => `1px solid ${props.color}`,
  color: (props) => props.color,
  borderRadius: "5px",
  cursor: "pointer",
  padding: "4px",
  boxShadow: "inset 0px 0px 3px white",
});
const TwitterLogo = styled.img({
  width: "20px",
});

export default App;
