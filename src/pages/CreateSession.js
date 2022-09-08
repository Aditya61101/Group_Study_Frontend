import React from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";

export const CreateSession = () => {
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if(form.checkValidity() === false){
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="form-wrap"
    >
      <h3 style={{ textAlign: "center" }}>New Group Study Session</h3>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Title of the session</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Title of the session"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          as={Col}
          md="12"
          controlId="validationCustom02"
          className="my-2"
        >
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject of the session"
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustomStartDate">
          <Form.Label>Start Date</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="date"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a start date.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Start Time</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="time"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a start time.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group
          as={Col}
          md="6"
          controlId="validationCustomUsername"
          className="my-2"
        >
          <Form.Label>End Date</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="date"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a end date.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group
          as={Col}
          md="6"
          controlId="validationCustomUsername"
          className="my-2"
        >
          <Form.Label>End Time</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="time"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a end time.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group
          as={Col}
          md="12"
          controlId="validationCustomUsername"
          className="my-2"
        >
          <Form.Label>Maximum student in the session</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              aria-describedby="inputGroupPrepend"
              placeholder="Maximum student"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose maximum students.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <div className="d-grid">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};
