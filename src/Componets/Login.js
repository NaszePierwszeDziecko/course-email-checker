import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import "../App.css";

export const Login = () => {
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const handleChangeEmail = (event) => {
    setValueEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setValuePassword(event.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await getToken({
        username: valueEmail,
        password: valuePassword,
      });
      if (data.message) {
        setError(data.message);
        return;
      }
      localStorage.setItem("token", data.token);
      setRedirect("/");
    } catch (e) {}
  };
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <Card className="card">
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="input">
            <Input
              value={valueEmail}
              placeholder="E-mail"
              fullWidth
              onChange={handleChangeEmail}
              inputProps={{ "aria-label": "description" }}
            />
          </div>
          <div className="password">
            <Input
              value={valuePassword}
              fullWidth
              placeholder="Password"
              onChange={handleChangePassword}
              inputProps={{ "aria-label": "description" }}
              type="password"
            />
          </div>
          <div className="button">
            <Box mt={3}>
              <Button
                disabled={false}
                variant="contained"
                fullWidth
                type={"submit"}
              >
                LOG IN
              </Button>
            </Box>
          </div>
          {error && <div className="Error">{error}</div>}
        </form>
      </CardContent>
    </Card>
  );
};
function getToken(userData) {
  return fetch(`${process.env.REACT_APP_API_URL}/login_check`, {
    body: JSON.stringify(userData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
