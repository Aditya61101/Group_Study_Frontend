import React from "react";
import SessionsContext from "./SessionsContext";
import { useNavigate } from "react-router-dom";

const SessionsProvider = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [upcomingSessions, setUpcomingSessions] = React.useState([]);
  const [errorFetch, setErrorFetch] = React.useState(null);
  const [errorRegister,setErrorRegister] = React.useState(null);
  const [successRegister,setSuccessRegister] = React.useState(null);
  const [registerSessionId,setRegisterSessionId] = React.useState(null);
  const [errorDelete,setErrorDelete] = React.useState(null);
  const [errorSubmit,setErrorSubmit] = React.useState(null);

  const fetchUpcomingSessions = async () => {
    let url = `${process.env.REACT_APP_BASENAME}api/upcoming_sessions`;
    let token = localStorage.getItem("token");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      console.log(response);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        setUpcomingSessions(data);
      } else {
        let errorMessage = "Cannot get upcoming sessions";
        const data = await response.json();
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
        setErrorFetch(error.message);
    }
  };
  const sessionSubmission = async (formData, sendMethod, sessionid) => {
    try {
      const authToken = localStorage.getItem("token");
      let url;
      if (sendMethod === "POST") {
        url = `${process.env.REACT_APP_BASENAME}api/upcoming_sessions`;
      } else {
        url = `${process.env.REACT_APP_BASENAME}api/upcoming_sessions/${sessionid}`;
      }
      const response = await fetch(url, {
        method: sendMethod,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
      setIsLoading(false);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        fetchUpcomingSessions();
        navigate("/upcomingSession");
      } else {
        let errorMessage = "Cannot create a session!";
        const data = await response.json();
        console.log(data);
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
        setErrorSubmit(error.message);
    }
  };
  const deleteSession = async (sessionid) => {
    try {
      const authToken = localStorage.getItem("token");
      let url = `${process.env.REACT_APP_BASENAME}api/upcoming_sessions/${sessionid}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      });
      setIsLoading(false);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        fetchUpcomingSessions();
        navigate("/upcomingSession");
      } else {
        let errorMessage = "Cannot create a session!";
        const data = await response.json();
        console.log(data);
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
        setErrorDelete(error.message);
    }
  };
  const registerSession = async (sessionid) => {
    try {
      const authToken = localStorage.getItem("token");
      let url = `${process.env.REACT_APP_BASENAME}api/userRegister/${sessionid}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        setSuccessRegister(data.message);
        setRegisterSessionId(data.sessionId);
      } else {
        let errorMessage = "Not Registered";
        const data = await response.json();
        console.log(data);
        setRegisterSessionId(data.sessionId);
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
        setErrorRegister(error.message);
    }
  };
  const sessionsValue = {
    upcomingSessions,
    isLoading,
    errorFetch,
    errorDelete,
    errorSubmit,
    errorRegister,
    successRegister,
    sessionSubmission,
    deleteSession,
    fetchUpcomingSessions,
    registerSession,
    registerSessionId
  };
  return (
    <SessionsContext.Provider value={sessionsValue}>
      {props.children}
    </SessionsContext.Provider>
  );
};
export default SessionsProvider;
