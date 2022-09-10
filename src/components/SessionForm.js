import React from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { LoadingSpinner } from "./LoadingSpinner";
import SessionsContext from "../context/SessionsContext";

export const SessionForm = (props) => {
  const sessionsContext = React.useContext(SessionsContext);
  const [validated, setValidated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const titleRef = React.useRef();
  const subjectRef = React.useRef();
  const startDRef = React.useRef();
  const startTRef = React.useRef();
  const endDRef = React.useRef();
  const endTRef = React.useRef();
  const maxStudRef = React.useRef();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      setIsLoading(true);
      const title = titleRef.current.value;
      const subject = subjectRef.current.value;
      const startDate = startDRef.current.value;
      const startTime = startTRef.current.value;
      console.log(startTime);
      const endDate = endDRef.current.value;
      const endTime = endTRef.current.value;
      const maxStud = maxStudRef.current.value;
      console.log(endDate);
      const formData = {
        title: title,
        subject: subject,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        maxStudents: maxStud,
      };
      sessionsContext.sessionSubmission(
        formData,
        props.method,
        props.sessionid
      );
    }
  };
  let content = null;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else {
    content = (
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={!props.isModal ? "form-wrap" : null}
        style={{ marginBottom: "30px" }}
      >
        <h3 style={{ textAlign: "center" }}>New Group Study Session</h3>
        <Row className="mb-3">
          <Form.Group as={Col} md={12} controlId="validationCustom01">
            <Form.Label>Title of the session</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title of the session"
              ref={titleRef}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md={12}
            controlId="validationCustom02"
            className="my-2"
          >
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject of the session"
              ref={subjectRef}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustomStartDate">
            <Form.Label>Start Date</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="date"
                aria-describedby="inputGroupPrepend"
                ref={startDRef}
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
                ref={startTRef}
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
                ref={endDRef}
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
                ref={endTRef}
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
                ref={maxStudRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose maximum students.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <div className="d-grid">
          <Button type="submit" onClick={props.handleClose}>Submit</Button>
        </div>
      </Form>
    );
  }
  return content;
};
