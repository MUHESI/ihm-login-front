import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../components/navigation";
import "../styles/signIn.css";
import { postAPI } from "../utils/fetchData";
//
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { validateEmail } from "../helpers/valid";
import { showToast, statusToast } from "../helpers/IhmToast";
import { textMessageLogin as textToast } from "../helpers/constants";
import Storage, { keyStorage } from "../context/Storage";

function SignIn() {
  const navigate = useNavigate();

  const [formLogin, setFormLogin] = useState({
    password: "",
    email: "",
    isLoading: false
  });

  const [validForm, setValidForm] = useState({
    password: false,
    email: false
  });
  React.useEffect(() => {
    setValidForm(checkForm(formLogin));
  }, [formLogin]);

  const handleSubmit = async () => {
    // CHECK FORM
    if (!validForm.email && !validForm.password) {
      return showToast({
        message: textToast.COMPLETE_ALL_FIELDS,
        typeToast: statusToast.ERROR
      });
    }
    if (!validForm.email) {
      return showToast({
        message: textToast.COMPLETE_EMAIL_FIELD,
        typeToast: statusToast.DARK
      });
    }
    if (!validForm.password) {
      return showToast({
        message: textToast.COMPLETE_PASSWORD_FIELD,
        typeToast: statusToast.DARK
      });
    }

    setFormLogin({ ...formLogin, isLoading: true });

    // BACKEND
    const {
      data: { data }
    } = await postAPI("auth/ihm/login", {
      password: formLogin.password,
      email: formLogin.email
    });
    if (data.success) {
      // WE STORE USER INFO IN LOCAL STORAGE
      Storage.setItem(keyStorage.ihmPersonal, data.results.names);
      return navigate(`/prediction`);
    } else
      showToast({
        message: textToast.EMAIL_OR_PASSWORD_INVALID,
        typeToast: statusToast.DARK
      });
    return setFormLogin({ ...formLogin, isLoading: false });
  };

  const [values, setValues] = React.useState({
    showPassword: false
  });
  const handleChange = (value, type) => {
    setFormLogin({ ...formLogin, [type]: value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkForm = (form) => {
    let resPassword = false;
    const { email, password } = form;
    const resEmail = validateEmail(email);
    if (password.length > 4) {
      resPassword = true;
    }
    return { email: resEmail, password: resPassword };
  };

  return (
    <>
      <NavBar />
      <div className='main-login'>
        <div className='container'>
          <h2> Connexion</h2>
          <div className='content-inputs'>
            <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
              <TextField
                color={`${!validForm.email ? "error" : "success"}`}
                label='Email'
                type='email'
                onChange={(e) => handleChange(e.target.value, "email")}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
              <InputLabel
                color={`${!validForm.password ? "error" : "success"}`}
              >
                Mot de passe
              </InputLabel>
              <OutlinedInput
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
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Mot de passe'
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
          </div>
          <p className='pwd-forget'>
            <button className='btn'> Mot de passe oublié ? </button>
          </p>
          <div className='content-actions'>
            <button
              type='submit'
              className='btn btn-'
              onClick={() => handleSubmit()}
            >
              {formLogin.isLoading ? "loading..." : "Se connecter"}
            </button>
            <button
              type='submit'
              className='btn'
              onClick={() => navigate("/signup")}
            >
              Inscription
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
