import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "../styles/signIn.css";
import { postAPI } from "../utils/fetchData";
import NavBar from "../components/navigation";

//
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { showToast, statusToast } from "../helpers/IhmToast";
import { textMessageSignUp as textToast } from "../helpers/constants";
import { checkFormSignUp } from "../helpers/vaildSignUp";
import Alert from "@mui/material/Alert";

function SignUp() {
  const navigate = useNavigate();
  const [formSignUp, setFormSignUp] = useState({
    password: "",
    email: "",
    confirmPassword: "",
    names: "",
    phone: "",
    isLoading: false
  });

  const handleSubmit = async () => {
    setFormSignUp({ ...formSignUp, isLoading: true });
    if (
      !formSignUp.confirmPassword ||
      !formSignUp.password ||
      !formSignUp.email ||
      !formSignUp.names
    ) {
      setFormSignUp({ ...formSignUp, isLoading: false });
      return showToast({
        message: textToast.COMPLETE_ALL_FIELDS_REQUIRED,
        typeToast: statusToast.ERROR
      });
    }
    const res = await postAPI("auth/ihm/register", formSignUp);
    if (res.data) return setSignUpSuccess(true);
    setFormSignUp({ ...formSignUp, isLoading: false });
  };
  const handleChange = (value, type) => {
    setFormSignUp({ ...formSignUp, [type]: value });
  };
  const [values, setValues] = React.useState({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [validForm, setValidForm] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    names: false,
    phone: true
  });
  React.useEffect(() => {
    setValidForm(checkFormSignUp(validForm, formSignUp));
  }, [formSignUp]);

  return (
    <>
      <NavBar />
      <div className='main-login'>
        {!signUpSuccess ? (
          <div className='container'>
            <h2> Insription </h2>
            <div className='content-inputs'>
              <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
                <TextField
                  color={`${!validForm.email ? "error" : "success"}`}
                  label='Email'
                  type='email'
                  required={true}
                  placeholder='eg. email@gmail.com'
                  onChange={(e) => handleChange(e.target.value, "email")}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
                <TextField
                  color={`${!validForm.names ? "error" : "success"}`}
                  label='Nom'
                  type='text'
                  required={true}
                  placeholder='Entrez votre nom'
                  onChange={(e) => handleChange(e.target.value, "names")}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
                <TextField
                  label='Numero de telephone'
                  type='text'
                  placeholder='eg. +243 998799306'
                  onChange={(e) => handleChange(e.target.value, "phone")}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
                <InputLabel
                  color={`${!validForm.password ? "error" : "success"}`}
                >
                  Mot de passe *
                </InputLabel>
                <OutlinedInput
                  required={true}
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  color={`${!validForm.password ? "error" : "success"}`}
                  onChange={(e) => handleChange(e.target.value, "password")}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Mot de passe *'
                />
                <span
                  style={{
                    margin: "4px 5px",
                    fontSize: "1.1em",
                    color: "#C4c3c4"
                  }}
                >
                  Au moins 5 caracters avec majuscules{" "}
                </span>
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
                <TextField
                  color={`${!validForm.confirmPassword ? "error" : "success"}`}
                  label='Confirmer le mot de passe'
                  type='password'
                  required={true}
                  onChange={(e) =>
                    handleChange(e.target.value, "confirmPassword")
                  }
                />
              </FormControl>
            </div>

            <div className='content-actions'>
              <button
                type='submit'
                className='btn'
                onClick={() => handleSubmit()}
              >
                {formSignUp.isLoading ? "loading..." : "S'inscrire"}
              </button>
              <button
                type='submit'
                className='btn btn-'
                onClick={() => navigate("/login")}
              >
                Connexion
              </button>
            </div>
          </div>
        ) : (
          <div className='container'>
            <AlertMessage />
          </div>
        )}
      </div>
    </>
  );
}
export default SignUp;

const AlertMessage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Alert
        variant='filled'
        severity='success'
        style={{ height: "50px" }}
        action={
          <Button
            color='inherit'
            size='small'
            onClick={() => navigate("/login")}
          >
            Se connecter
          </Button>
        }
      >
        Votre compte a été crée avec success
      </Alert>
    </>
  );
};
