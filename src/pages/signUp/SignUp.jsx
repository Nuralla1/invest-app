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
              <Grid item xs={12}>
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
                      value: /(?!^\d+$)^[-\w]{3,15}$/i,
                      message:
                        "Логин должен быть от 3 до 15 символов, только латиница. Без пробелов, без спецсимволов, кроме нижнего подчеркивания и дефиса. Может содержать числа, но не полностью состоять из них.",
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
                      value:
                        /^(?=.*?[0-9])(?=.*?[!@#$%^&*)(+?=._<>\\/]).{8,30}$/i,
                      message:
                        "Пароль должен содержать от 8 до 30 символов и иметь хотя бы одну цифру и специсимвол.",
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
