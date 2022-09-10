import React from "react";
import { Col, Row, Container, Modal, Button } from "react-bootstrap";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { UpcomingSessionItem } from "../components/UpcomingSessionItem";
import { SessionForm } from "../components/SessionForm";
import SessionsContext from "../context/SessionsContext";

export const UpcomingSessions = () => {
  const sessionsContext = React.useContext(SessionsContext);
  const [show, setShow] = React.useState(false);
  const [sesId, setSesId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [array, setArray] = React.useState([]);
  React.useEffect(() => {
    setIsLoading(true);
    console.log("worked");
    sessionsContext.fetchUpcomingSessions();
    setIsLoading(false);
  }, []);
  React.useEffect(() => {
    setArray([...sessionsContext.upcomingSessions]);
  }, [sessionsContext.upcomingSessions]);

  // React.useEffect(() => {
  //   console.log("sort: ", array);
  // }, [array])

  const handleClose = () => {
    setShow(false);
  };
  const updateSessions = (sessionID) => {
    setSesId(sessionID);
    setShow(true);
  };
  const deleteSession = (sessionID) => {
    sessionsContext.deleteSession(sessionID);
  };
  const regSession = (sessionID) => {
    sessionsContext.registerSession(sessionID);
  };
  const handleSort = () => {
    const sortedArray = [...array];
    setArray(
      sortedArray.sort((curr, next) => {
        if (curr.startDate > next.startDate) {
          return -1;
        } else if (curr.endDate > next.endDate) {
          return -1;
        } else if (curr.startTime > next.startTime) {
          return -1;
        } else if (curr.endTime > next.endTime) {
          return -1;
        } else {
          return 1;
        }
      })
    );
  };
  let modal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <SessionForm
          method="PUT"
          isModal={true}
          sessionid={sesId}
          handleClose={handleClose}
        />
      </Modal.Body>
    </Modal>
  );

  let content = null;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (sessionsContext.upcomingSessions.length === 0) {
    content = (
      <div style={{ margin: "auto", fontSize: "20px" }}>
        No, upcoming Study sessions!
      </div>
    );
  } else {
    content = (
      <Container>
        <Row>
          {array.map((session) => {
            return (
              <Col lg={4} xl={4} md={6} key={session._id}>
                <UpcomingSessionItem
                  sessionId={session._id}
                  createdById={session.user}
                  title={session.title}
                  subject={session.subject}
                  start_date={session.startDate.substr(0, 10)}
                  start_time={session.startTime}
                  end_date={session.endDate.substr(0, 10)}
                  end_time={session.endTime}
                  max_students={session.maxStudents}
                  updateSessions={updateSessions}
                  deleteSession={deleteSession}
                  regSession={regSession}
                />
              </Col>
            );
          })}
        </Row>
        <Button className="my-3 btn-lg" onClick={handleSort}>
          Sort
        </Button>
      </Container>
    );
  }
  return (
    <>
      {modal}
      {content}
    </>
  );
};
