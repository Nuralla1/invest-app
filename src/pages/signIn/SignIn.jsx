import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";

export default function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (info) => {
    try {
      // const response = await signIn(info);
      // const resJson = await response.json();
      // sessionStorage.setItem("Token", resJson.body.accessToken);
      // if (response.status === 401 || response.status === 400) {
      //   throw new Error(response.error);
      // }

      navigate("/");
    } catch (error) {
      alert(error);
    }
    reset();
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(349deg, #ff6262, #ffe2e2)",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={!!errors.username?.message}
              helperText={errors.username?.message}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Логин"
              name="username"
              autoComplete="username"
              autoFocus
              {...register("username", {
                required: "Поле обязательно для заполнения",
                pattern: {
                  value: /^[a-z]+$/i,
                  message: "Логин должен быть на на латнице.",
                },
              })}
            />

            <TextField
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Поле обязательно для заполнения",
                pattern: {
                  value: /^.{4,}$/i,
                  message: "Пароль должен содержать от 4 любых символов.",
                },
              })}
            />

            <Grid container>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Запомнить"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              color="inherit"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Авторизируйтесь
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  onClick={() => navigate("/signUp")}
                  color="inherit"
                  variant="outlined"
                  style={{ width: "400px" }}
                >
                  Нет аккаунта? Зарегистрируйтесь
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
