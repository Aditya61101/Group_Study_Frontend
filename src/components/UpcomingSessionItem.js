import { Button } from "react-bootstrap";
import "../css/cards.css";

export const UpcomingSessionItem = (props) => {
  return (
    <div className="session-card">
      <p>Title: {props.title}</p>
      <p>Subject: {props.subject}</p>
      <p>
        Start Date: {props.start_date} Start Time:
        {props.start_time}
      </p>
      <p>
        End Date: {props.end_date} End Time: {props.end_time}
      </p>
      <p>Maximum Students: {props.max_students}</p>
      <div className="d-grid">
        <Button>Register</Button>
      </div>
    </div>
  );
};
