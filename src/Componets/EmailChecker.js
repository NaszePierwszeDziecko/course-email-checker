import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../App.css";
import Box from "@material-ui/core/Box";
import { getToken } from "../utils/userUtils";

export const EmailChecker = () => {
  const [valueEmail, setValueEmail] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleChangeEmail = (event) => {
    setValueEmail(event.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setUser(null);
    setError(null);

    try {
      const result = await checkEmail(valueEmail);
      if (result) {
        setUser(result);
      } else {
        setError("Ten email nie posiada kursów.");
      }
    } catch (e) {}
  };

  let disableButton = valueEmail === "";

  return (
    <Card className="card">
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
        {user && (
          <div style={{ marginTop: 10 }}>
            <Typography variant="h6">Lista kursów:</Typography>
            <div className="List" style={{ marginBottom: 15 }}>
              {user.courses.map((result) => (
                <ListItem key={result.id}>
                  <ListItemText primary={result.title} />
                </ListItem>
              ))}
            </div>

            <Typography variant="h6">Data ostatniego logowania:</Typography>
            <div>
              {null === user.last_login_date ? (
                <span style={{ color: "red" }}>Nie logowała się jeszcze</span>
              ) : (
                new Date(Date.parse(user.last_login_date)).toLocaleStringgit()
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

async function checkEmail(email) {
  const token = getToken();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/check-email`,
    {
      body: JSON.stringify({ email }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return parseJSON(response);
}

function parseJSON(response) {
  return response.text().then(function (text) {
    return text ? JSON.parse(text) : null;
  });
}
