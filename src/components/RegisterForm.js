import React from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const RegisterForm = (props) => {
  const authContext=React.useContext(AuthContext);
  const navigate = useNavigate();
  const [validated, setValidated] = React.useState(false);
  const [isInvalidEmail,setIsInvalidEmail]=React.useState(null);
  const [isInvalidPassword,setIsInvalidPassword]=React.useState(null);
  const passwordRef =React.useRef();
  const emailRef=React.useRef();

  const handleSubmit = (event) => {
    const passwordValue=passwordRef.current.value;
    const emailValue=emailRef.current.value;
    event.preventDefault();
    if(passwordValue.length<6){
      setIsInvalidPassword(true);
      event.stopPropagation();
    }
    else{
        setIsInvalidPassword(false);
    }
    if(!emailValue.includes('@')){
        setIsInvalidEmail(true);
        event.stopPropagation();
    }
    else{
        setIsInvalidEmail(false);
    }
    if(passwordValue.length>=6&&emailValue.includes('@')) {
      setValidated(true);
      authContext.handleLogin();
      navigate("/upcomingSession");
    }
  };
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="form-wrap"
    >
      <h3 style={{ textAlign: "center" }}>{props.title}</h3>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomEmail">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Enter email"
              aria-describedby="inputGroupPrepend"
              ref={emailRef}
              isInvalid={isInvalidEmail}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group
          as={Col}
          md="12"
          controlId="validationCustomPassword"
          className="my-2"
        >
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="password"
              placeholder="Enter password"
              aria-describedby="inputGroupPrepend"
              ref={passwordRef}
              isInvalid={isInvalidPassword}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please should be of at least 6 characters
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <div className="d-grid">
        <Button type="submit">Submit</Button>
      </div>
      <p className="text-end my-2">
        {props.question}
        <Link to={props.linked} className="link">
          {props.oppo}
        </Link>
      </p>
    </Form>
  );
};
