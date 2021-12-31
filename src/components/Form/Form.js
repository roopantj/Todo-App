import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { Card, CardBody, CardTitle, Input, Button } from "reactstrap";
const Form = ({
  title,
  name,
  updateName,
  email,
  password,
  updateEmail,
  updatePassword,
  handleAction,
  togglePage,
  togglePageContent,
}) => {
  const togglePageHandler = () => {
    updateEmail("");
    updatePassword("");
    navigate(togglePage);
  };
  const navigate = useNavigate();
  return (
    <div className="formContainer">
      <Card>
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          {title === "Register" && (
            <Input
              id="Name"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={(event) => updateName(event.target.value)}
            />
          )}
          <Input
            id="Email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => updateEmail(event.target.value)}
          />
          <Input
            id="Password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={(event) => updatePassword(event.target.value)}
          />
          <Button color="primary" outline onClick={togglePageHandler}>
            {togglePageContent}
          </Button>
          <Button color="primary" onClick={handleAction}>
            {title}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Form;
