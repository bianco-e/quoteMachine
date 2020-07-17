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

  const [ObjToPost, setObjToPost] = useState(undefined);

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  useEffect(() => {
    if (subject !== "") {
      setCarrerYear(subjects.find((subj) => subj.name === subject).year);
    }
  }, [subject]);

  useEffect(() => {
    ObjToPost &&
      fetch("http://localhost:5000/addQuote", {
        method: "POST",
        body: JSON.stringify(ObjToPost),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log("Error:", err));
  }, [ObjToPost]);

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
        subject !== ""
      ) {
        setObjToPost({
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
        Cita
        <Input
          color={color}
          placeholder="Agregá tu cita sin comillas. Ej: El proletariado..."
          width="100%"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        Autor
        <Section>
          <Input
            color={color}
            placeholder="Nombre. Ej: Karl"
            value={authorFName}
            onChange={(e) => setAuthorFName(e.target.value)}
          />
          <Input
            color={color}
            placeholder="Apellido. Ej: Marx"
            value={authorLName}
            onChange={(e) => setAuthorLName(e.target.value)}
          />
        </Section>
        Materia
        <Select
          color={color}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {subjects.map((subj) => {
            return (
              <option key={subj.name} value={subj.name}>
                {subj.name}
              </option>
            );
          })}
        </Select>
        Texto
        <Input
          color={color}
          placeholder="Ej: Manifiesto comunista"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        Link
        <Input
          color={color}
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
  border: (props) => `1px solid ${props.color}`,
  margin: "1px",
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
  backgroundColor: (props) => props.color,
  color: "whitesmoke",
  border: "none",
  borderRadius: "5px",
  padding: "5px",
});

export default AddQuote;
