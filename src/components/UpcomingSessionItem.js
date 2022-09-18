import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import { Button } from "react-bootstrap";
import "../css/cards.css";
import SessionsContext from "../context/SessionsContext";

export const UpcomingSessionItem = (props) => {
  const sessionsContext = React.useContext(SessionsContext);
  const [disabled, setDisabled] = React.useState(true);
  const [show, setShow] = React.useState(true);
  const [showError, setShowError] = React.useState("");
  const [showSuccess, setShowSuccess] = React.useState("");
  const currentUser = localStorage.getItem("userID");

  const handleEdit = () => {
    props.updateSessions(props.sessionId);
    console.log("session edited");
  };
  const handleDelete = () => {
    props.deleteSession(props.sessionId);
    console.log("session deleted");
  };
  const handleRegister = () => {
    props.regSession(props.sessionId);
  };
  React.useEffect(() => {
    if (currentUser !== props.createdById) {
      setDisabled(false);
      setShow(false);
    }
    //to show error message
    if (
      props.sessionId === sessionsContext.registerSessionId &&
      sessionsContext.success === false
    ) {
      setShowError(sessionsContext.errorRegister);
    }
    setTimeout(() => {
      setShowError(null);
    }, 2000);
    //to show success message
    if (
      props.sessionId === sessionsContext.registerSessionId &&
      sessionsContext.success === true
    ) {
      setShowSuccess(sessionsContext.successRegister);
    }
    setTimeout(() => {
      setShowSuccess(null);
    }, 2000);
  }, [
    currentUser,
    props.createdById,
    props.sessionId,
    sessionsContext.registerSessionId,
    sessionsContext.errorRegister,
    sessionsContext.successRegister,
    sessionsContext.success,
  ]);
  return (
    <div className="session-card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p>Title: {props.title}</p>
        {show && (
          <div>
            <Edit className="mx-2" onClick={handleEdit} />
            <Delete onClick={handleDelete} />
          </div>
        )}
      </div>
      <p>Subject: {props.subject}</p>
      <p>
        Start Date: {props.start_date} Start Time: {props.start_time}
      </p>
      <p>
        End Date: {props.end_date} End Time: {props.end_time}
      </p>
      <p>Maximum Students: {props.max_students}</p>

      <div className="d-grid">
        <Button onClick={handleRegister} disabled={disabled}>
          Register
        </Button>
      </div>
      {showSuccess && <small style={{ color: "green" }}>{showSuccess}</small>}
      {showError && <small style={{ color: "red" }}>{showError}</small>}
    </div>
  );
};
