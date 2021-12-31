import React, { useEffect, useState } from "react";
import TodoItems from "../TodoItems/TodoItems";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { Button, Input } from "reactstrap";
import "./Home.css";
const Home = ({ currentUser }) => {
  const [todoItem, setTodoItem] = useState("");
  const [userName, setUserName] = useState("");
  const db = getDatabase();
  //const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
  };

  const postTodoItem = () => {
    push(ref(db, "/user/" + currentUser + "/todoList"), {
      todoItem,
      complete: false,
    });
    setTodoItem("");
  };
  useEffect(() => {
    onValue(ref(db, "/user/" + currentUser + "/name"), (snapshot) => {
      let name = snapshot.val();
      setUserName(name);
    });
  }, [currentUser]);
  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  //useEffect(() => {
  //  if (!currentUser) {
  //    const auth = getAuth();
  //    onAuthStateChanged(auth, (user) => {
  //      if (user) {
  //        setCurrentUser(user.uid);
  //      } else {
  //        navigate("/login");
  //      }
  //    });
  //  }
  //}, [currentUser]);
  return (
    <div>
      <div className="Header">
        <h3>Welcome {userName}</h3>
        <Button color="danger" onClick={handleLogout}>
          Logout{" "}
        </Button>
      </div>
      <div className="AddTodo">
        <Input
          id="todo"
          name="todo"
          placeholder="Add Todo"
          value={todoItem}
          onChange={(event) => setTodoItem(event.target.value)}
        />
        <Button color="dark" onClick={postTodoItem}>
          Add
        </Button>
      </div>
      <TodoItems UID={currentUser} />
    </div>
  );
};

export default Home;
