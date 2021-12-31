import "./App.css";
import { useDispatch } from "react-redux";
import { authActions } from "./store/reducers/auth";
import { app } from "../src/firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import Form from "./components/Form/Form";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { UncontrolledAlert } from "reactstrap";
import Home from "./components/Home/Home";
import NoPage from "./components/NoPage/NoPage";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [email, updateEmail] = useState("");
  const [name, updateName] = useState("");
  const [password, updatePassword] = useState("");
  const [isError, updateError] = useState(false);
  const [errMsg, setErrMsg] = useState("Error with email/password");
  const db = getDatabase();
  const navigate = useNavigate();
  const errAlert = <UncontrolledAlert color="info">{errMsg}</UncontrolledAlert>;
  const handleAction = (id) => {
    updateError(false);
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate("/");
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
        })
        .catch((err) => {
          updateError(true);
          setErrMsg(err.message);
        });
    }
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate("/");
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );

          set(
            ref(db, "/user/" + authentication.currentUser.uid + "/name"),
            name
          );
        })
        .catch((err) => {
          updateError(true);
          setErrMsg(err.message);
        });
    }
  };
  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (!currentUser) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user.uid);
        } else {
          navigate("/login");
        }
      });
    }
  }, [currentUser]);
  return (
    <div className="App">
      {isError && errAlert}
      <Routes>
        <Route
          path="/login"
          element={
            <Form
              title={"Login"}
              email={email}
              password={password}
              updateEmail={updateEmail}
              updatePassword={updatePassword}
              handleAction={() => handleAction(1)}
              togglePage={"/register"}
              togglePageContent={"Sign up"}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Form
              title={"Register"}
              email={email}
              password={password}
              name={name}
              updateName={updateName}
              updateEmail={updateEmail}
              updatePassword={updatePassword}
              handleAction={() => handleAction(2)}
              togglePage={"/login"}
              togglePageContent={"Sign in"}
            />
          }
        />
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
