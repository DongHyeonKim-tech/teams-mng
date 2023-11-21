import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { SignInButton } from "../features/layout/SignInButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "40vh",
    backgroundColor: "rgba(224, 224, 224)",
  },
  image: {
    width: 163,
    height: 43,
    margin: theme.spacing(5),
  },
  title: {
    margin: theme.spacing(5),
  },
  button: {
    width: "100%",
    margin: theme.spacing(5),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="sm">
      <Paper elevation={0} className={classes.paper}>
        <img src="logo-haeahn.png" alt="Logo" className={classes.image} />

        <Typography className={classes.title} variant={"h4"}>
          <b>평가인증 Teams 관리 시스템</b>
        </Typography>

        <SignInButton />
      </Paper>
    </Container>
  );
};

export default LoginPage;
