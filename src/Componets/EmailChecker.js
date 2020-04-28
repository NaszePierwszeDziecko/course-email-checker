import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../App.css";
import Box from "@material-ui/core/Box";
import { getToken } from "../utils/userUtils";

export const EmailChecker = () => {
  const [valueEmail, setValueEmail] = useState("");
  const [resultEmail, setResultEmail] = useState(null);
  const [error, setError] = useState(null);

  const handleChangeEmail = (event) => {
    setValueEmail(event.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setResultEmail(null);
    setError(null);

    try {
      const result = await checkEmail(valueEmail);
      if (result) {
        console.log(result);
        setResultEmail(result.courses);
      } else {
        setError("Wystąpił błąd: Email ten nie posiada kursów.");
      }
    } catch (e) {}
  };
  let disableButton;
  if (valueEmail === "") {
    disableButton = true;
  } else {
    disableButton = false;
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Input
            value={valueEmail}
            placeholder="E-mail"
            onChange={handleChangeEmail}
            fullWidth
            inputProps={{ "aria-label": "description" }}
          />
          <Box mt={2}>
            <Button
              disabled={disableButton}
              variant="contained"
              fullWidth
              type="submit"
            >
              SPRAWDŹ
            </Button>
          </Box>
        </form>
        {error && <div className="Error">{error}</div>}
        {resultEmail && (
          <List>
            <Typography>Lista kursów:</Typography>
            <div className="List">
              {resultEmail.map((result) => (
                <div key={result.id}>
                  <ListItem>
                    <ListItemText primary={result.title} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </div>
          </List>
        )}
      </CardContent>
    </Card>
  );
};

function checkEmail(email) {
  const token = getToken();
  return fetch(`${process.env.REACT_APP_API_URL}/users/check-email`, {
    body: JSON.stringify({ email }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(parseJSON);
}

function parseJSON(response) {
  return response.text().then(function (text) {
    return text ? JSON.parse(text) : null;
  });
}
