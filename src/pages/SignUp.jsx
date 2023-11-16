import { useEffect, useState } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomLink from "../components/CustomLink";
import Loader from "../components/Loader";
import { Alert, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";

const defaultTheme = createTheme();

export default function SignUp() {
  const loginUserInfo = useSelector((state) => state.userLoginR);
  const { userInfo } = loginUserInfo;

  const registeredUserInfo = useSelector((state) => state.userRegisterR);
  const { userInfoR, loading, error } = registeredUserInfo;

  console.log(error);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [tc, setTc] = useState(false);

  useEffect(() => {
    if (userInfo) {
      console.log("A logged user existed");
      let from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } else if (userInfoR) {
      console.log("A new user created");
      let from = location.state?.from?.pathname || "/sign-in";
      navigate(from, { replace: true });
    }
  }, [userInfo, userInfoR]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      register(
        data.get("name"),
        data.get("email"),
        tc,
        data.get("password"),
        data.get("password2")
      )
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={Paper} elevation={6} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} variant="outlined">
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Re-enter Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onChange={() => {
                        setTc(!tc);
                      }}
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {loading ? (
              <Loader />
            ) : (
              <>
                {error && (
                  <Alert severity="error">
                    <strong>{error}</strong>
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <CustomLink to="/sign-in">
                  {" Already have an account? Sign in"}
                </CustomLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
