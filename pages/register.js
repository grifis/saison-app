import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material/";
import axios from "axios";
import Cookies from "js-cookie";

export default function Register() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const axiosInstance = axios.create({
      baseURL: `http://localhost:3000/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    (async () => {
      setIsError(false);
      setErrorMessage("");
      return await axiosInstance
        .post("auth", {
          email: data.get("email"),
          password: data.get("password"),
          password_confirmation: data.get("password_confirmation"),
        })
        .then(function (response) {
          // Cookieにトークンをセットしています
          Cookies.set("uid", response.headers["uid"]);
          Cookies.set("client", response.headers["client"]);
          Cookies.set("access-token", response.headers["access-token"]);
          router.push("/");
        })
        .catch(function (error) {
          // Cookieからトークンを削除しています
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          setIsError(true);
          console.log(error);
          setErrorMessage(error.response.data.errors[0]);
        });
    })();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box>
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            name="password_confirmation"
            label="パスワード(確認)"
            type="password"
            id="password_confirmation"
            autoComplete="current-password"
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            新規登録
          </Button>
          {isError ? (
            <Alert
              onClose={() => {
                setIsError(false);
                setErrorMessage("");
              }}
              severity="error"
            >
              {errorMessage}
            </Alert>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
}
