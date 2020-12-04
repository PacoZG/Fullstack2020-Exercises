import React from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks/index";
import { userLogin } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
// services
import loginService from "../services/login";

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField("usarname");
  const password = useField("password");

  const credentials = {
    username: username.param.value,
    password: password.param.value,
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      var user = await loginService.login(credentials);
      dispatch(userLogin(user));
      dispatch(setNotification(`logged in, welcome back ${user.name}`, "success"));
    } catch (exception) {
      dispatch(setNotification("wrong username or password", "error"));
    }
  };

  return (
    <form className={"normal"} onSubmit={handleLogin}>
      <table>
        <tbody>
          <tr>
            <td>{"username"}</td>
            <td>
              <input id="username" name="Username" {...username.param} />
            </td>
          </tr>
          <tr>
            <td>{"password"}</td>
            <td>
              <input id="password" name="Password" {...password.param} />
            </td>
          </tr>
        </tbody>
      </table>
      <button id="login-button" className={"button"} type="submit">
        {"login"}
      </button>
    </form>
  );
};

export default LoginForm;
