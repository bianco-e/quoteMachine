import React, { useState, useEffect } from "react";
import { getRandomColor } from "../utils.js";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { subjects } from "../data/data";

const AddQuote = () => {
  const [color, setColor] = useState("");
  const [quote, setQuote] = useState("");
  const [authorFName, setAuthorFName] = useState("");
  const [authorLName, setAuthorLName] = useState("");
  const [subject, setSubject] = useState("");
  const [carrerYear, setCarrerYear] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  const history = useHistory();

  const addQuote = () => {
    const finalQuote = `${quote} - ${authorFName.split("")[0]}. ${authorLName}`;
    const author = `${authorFName} ${authorLName}`;
    if (finalQuote.length < 280) {
      if (
        quote !== "" &&
        author !== "" &&
        text !== "" &&
        link !== "" &&
        carrerYear !== ""
      ) {
        console.log({
          quote,
          author,
          subject,
          text: { name: text, link },
          carrerYear,
        });
        setQuote("");
        setAuthorFName("");
        setAuthorLName("");
        setSubject("");
        setCarrerYear("");
        setText("");
        setLink("");
      } else {
        alert("Debes completar todos los campos");
      }
    } else {
      alert(
        `La cita es demasiado larga para que pueda twittearse. Sobran ${
          finalQuote.length - 280
        } caracteres`
      );
    }
  };

  return (
    <Wrapper color={color}>
      <Container>
        Cita:
        <Input
          placeholder="Agregá tu cita sin comillas. Ej: La comunicación es..."
          width="100%"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        Autor:
        <Section>
          <Input
            placeholder="Nombre"
            value={authorFName}
            onChange={(e) => setAuthorFName(e.target.value)}
          />
          <Input
            placeholder="Apellido"
            value={authorLName}
            onChange={(e) => setAuthorLName(e.target.value)}
          />
        </Section>
        Materia:
        <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {subjects.map((subj) => {
            return (
              <option key={subj} value={subj}>
                {subj}
              </option>
            );
          })}
        </Select>
        Año de carrera:
        <Select
          value={carrerYear}
          onChange={(e) => setCarrerYear(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </Select>
        Texto:
        <Input
          placeholder="Ej: Manifiesto comunista"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        Link:
        <Input
          placeholder="Ej: http://www...."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button color={color} onClick={() => addQuote()}>
          Agregar
        </Button>
      </Container>
      <Button bgColor={color} onClick={() => history.push("/")}>
        Volver a Inicio
      </Button>
    </Wrapper>
  );
};

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
  alignItems: "center",
  textAlign: "center",
  borderRadius: "5px",
  padding: "1%",
  width: "40%",
});
const Input = styled.input({
  borderRadius: "5px",
  padding: "1%",
  fontSize: "13px",
  width: (props) => props.width,
});
const Section = styled.div({
  display: "flex",
  justifyContent: "space-between",
});
const Button = styled.button({
  marginTop: "10px",
  backgroundColor: (props) => props.bgColor || "whitesmoke",
  borderRadius: "5px",
  padding: "5px",
  cursor: "pointer",
  border: (props) =>
    `${props.color ? "1px solid " + props.color : "1px solid whitesmoke"}`,
  color: (props) => props.color || "whitesmoke",
  boxShadow: "inset 0px 0px 3px white",
});
const Select = styled.select({
  width: "45%",
  fontSize: "13px",
});

export default AddQuote;
