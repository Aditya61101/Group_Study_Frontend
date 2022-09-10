import React from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { LoadingSpinner } from "./LoadingSpinner";

export const RegisterForm = (props) => {
  const { REACT_APP_BASENAME } = process.env;
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [validated, setValidated] = React.useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = React.useState(null);
  const [isInvalidPassword, setIsInvalidPassword] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const passwordRef = React.useRef();
  const emailRef = React.useRef();

  const handleSubmit = async (event) => {
    const enteredPassword = passwordRef.current.value;
    const enteredEmail = emailRef.current.value;
    event.preventDefault();
    if (enteredPassword.length < 6) {
      setIsInvalidPassword(true);
      event.stopPropagation();
    } else {
      setIsInvalidPassword(false);
    }
    if (!enteredEmail.includes("@")) {
      setIsInvalidEmail(true);
      event.stopPropagation();
    } else {
      setIsInvalidEmail(false);
    }
    if (enteredPassword.length >= 6 && enteredEmail.includes("@")) {
      setValidated(true);
      setIsLoading(true);
      try {
        const authData = {
          email: enteredEmail,
          password: enteredPassword,
        };
        let url;
        if (props.postUrl === "Login") {
          url = `${REACT_APP_BASENAME}api/user/login`;
        } else if (props.postUrl === "Sign Up") {
          url = `${REACT_APP_BASENAME}api/user/register`;
        }
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authData),
        });
        console.log(response);
        setIsLoading(false);
        if (response.status === 201) {
          const data = await response.json();
          console.log(data);
          authContext.handleLogin(data.token, data.id, data.email);
          navigate("/upcomingSession");
        } else {
          let errorMessage = "User is already registered";
          const data = await response.json();
          if (data && data.error) {
            errorMessage = data.error;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };
  return (
    <>
      {!isLoading && (
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
            {error && <small style={{ color: "red" }}>{error}</small>}
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
      )}
      {isLoading && (
        <LoadingSpinner/>
      )}
    </>
  );
};
