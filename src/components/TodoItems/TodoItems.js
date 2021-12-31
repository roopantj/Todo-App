import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { onValue, ref, getDatabase, remove, update } from "firebase/database";
import "./TodoItems.css";
const TodoItems = ({ UID }) => {
  const [todoList, updateTodoList] = useState([]);
  const db = getDatabase();
  console.log(todoList);
  const removeTodoItem = (id) => {
    remove(ref(db, "/user/" + UID + "/todoList/" + id));
  };
  const completeTodoItem = (item) => {
    update(ref(db, "/user/" + UID + "/todoList/" + item.key), {
      ...item,
      complete: !item.complete,
    });
  };

  useEffect(() => {
    const dbRef = ref(db, "/user/" + UID + "/todoList");
    onValue(dbRef, (snapshot) => {
      const todoObj = snapshot.val(); //{ ele1:{...}, ele2:{...}, ele3:{...}, ele4:{...} }

      let newTodoList = [];
      for (const key in todoObj) {
        newTodoList = [{ key, ...todoObj[key] }].concat(newTodoList);
        //newTodoList.push(todoObj[key]);
      }
      //console.log(newTodoList);
      updateTodoList(newTodoList);
    });
  }, [UID]);
  return (
    <div className="todoContainer">
      {todoList.length > 0
        ? todoList.map((ele) => (
            <div
              key={ele.key}
              className={ele.complete ? "todoCard success" : "todoCard"}
            >
              <h3>{ele.todoItem}</h3>
              <div className="actionContainer">
                <Button
                  outline
                  color="dark"
                  onClick={() => removeTodoItem(ele.key)}
                >
                  Remove
                </Button>
                <Button color="dark" onClick={() => completeTodoItem(ele)}>
                  {ele.complete ? "Completed" : "Complete"}
                </Button>
              </div>
            </div>
          ))
        : "Nothing to display"}
    </div>
  );
};

export default TodoItems;
