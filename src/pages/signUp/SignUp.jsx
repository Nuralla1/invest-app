import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useUserContext } from "../../UserContext";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (info) => {
    try {
      // const response = await signUp(info);
      // const resJson = await response.json();

      // if (response.status === 401 || response.status === 400) {
      //   throw new Error(response.error);
      // }
      // console.log(resJson);
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
            Регистрация
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.firstName?.message}
                  helperText={errors.firstName?.message}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                  {...register("firstName", {
                    required: "Поле обязательно для заполнения",
                    pattern: {
                      value: /^[a-z]+$/i,
                      message:
                        "Имя должно быть на латинице, без цифр и спецсимволов",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.lastName?.message}
                  helperText={errors.lastName?.message}
                  required
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName", {
                    required: "Поле обязательно для заполнения",
                    pattern: {
                      value: /^[a-z]+$/i,
                      message:
                        "Фамилия должна быть на латинице, без цифр и спецсимволов",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  required
                  fullWidth
                  id="email"
                  label="Почта"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Поле обязательно для заполнения",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Email нейдействителен.",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Поле обязательно для заполнения",
                    pattern: {
                      value: /^.{4,}$/i,
                      message: "Пароль должен содержать от 4 любых символов.",
                    },
                  })}
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
              Зарегистрироваться
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  onClick={() => navigate("/signIn")}
                  color="inherit"
                  variant="outlined"
                  style={{ width: "400px" }}
                >
                  Есть аккаунт? Авторизируйтесь
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
