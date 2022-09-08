import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { UpcomingSessionItem } from "../components/UpcomingSessionItem";

export const UpcomingSessions = () => {
  const dummySessions = [
    {
      title: "Physics",
      subject: "study for physics",
      start_date: "07-09-2022",
      start_time: "11:50",
      end_date: "10-09-2022",
      end_time: "12:50",
      max_students: "12",
    },
    {
      title: "Chemistry",
      subject: "study for chemistry",
      start_date: "08-09-2022",
      start_time: "12:50",
      end_date: "08-09-2022",
      end_time: "15:50",
      max_students: "20",
    },
    {
      title: "Maths",
      subject: "study for maths",
      start_date: "09-09-2022",
      start_time: "13:44",
      end_date: "09-09-2022",
      end_time: "20:00",
      max_students: "13",
    },
    {
      title: "DSA",
      subject: "study for dsa",
      start_date: "11-09-2022",
      start_time: "14:44",
      end_date: "11-09-2022",
      end_time: "15:21",
      max_students: "21",
    },
    {
      title: "others",
      subject: "",
      start_date: "11-09-2022",
      start_time: "15:30",
      end_date: "11-09-2022",
      end_time: "17:30",
      max_students: "21",
    },
  ];
  return (
    <Container>
      <Row>
        {dummySessions.map((session) => {
          return (
            <Col lg={4} xl={4} md={6}>
              <UpcomingSessionItem
                title={session.title}
                subject={session.subject}
                start_date={session.start_date}
                start_time={session.start_time}
                end_date={session.end_date}
                end_time={session.end_time}
                max_students={session.max_students}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
