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
  const displaySessions = () => {
    const sortedArray = [...array];
    const propComp = (sD, eD, sT, eT) => (a, b) => {
      if (a[sD] !== b[sD]) {
        if (a[sD] > b[sD]) {
          return 1;
        } else {
          return -1;
        }
      } else if (a[eD] !== b[eD]) {
        if (a[eD] > b[eD]) {
          return 1;
        } else {
          return -1;
        }
      } else if (a[sT] !== b[sT]) {
        if (a[sT] > b[sT]) {
          return 1;
        } else {
          return -1;
        }
      } else if (a[eT] !== b[eT]) {
        if (a[eT] > b[eT]) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return 0;
      }
    };
    if (isSort) {
      sortedArray.sort(
        propComp("startDate", "endDate", "startTime", "endTime")
      );
    }
    setArray(sortedArray);
  };
  let isSort = true;
  const handleSort = () => {
    displaySessions();
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
          title={"Edit the Session"}
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
