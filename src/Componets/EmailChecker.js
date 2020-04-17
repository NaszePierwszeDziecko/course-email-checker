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

export const EmailChecker = () => {
  const [valueEmail, setValueEmail] = useState("");
  const [resultEmail, setResultEmail] = useState(null);
  const [error, setError] = useState(null);

  const handleChangeEmail = (event) => {
    setValueEmail(event.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setResultEmail(null);
    setError(null);
    const result = checkEmail(valueEmail);
    if (result.success) {
      setResultEmail(result.courses);
    }
    setError(result.error);
  };
  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Input
            value={valueEmail}
            placeholder="E-mail"
            onChange={handleChangeEmail}
            inputProps={{ "aria-label": "description" }}
          />
          <Box mt={2}>
            <Button variant="contained" fullWidth>
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
  // TODO: use real world api
  // return fetch("https://owncourses.org/api/login_check  ", {
  //   body: JSON.stringify(userData),
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }).then((res) => res.json());
  if (email === "dobryemail@example.com") {
    return {
      success: true,
      courses: [
        {
          id: 1,
          title: "Szkoła rodzenia Anny Nowak",
        },
        {
          id: 2,
          title: "Szkoła wychowania Anny Kowalczyk",
        },
      ],
    };
  }

  return {
    success: false,
    error: "Nie posiada żadnych kursów",
  };
}
