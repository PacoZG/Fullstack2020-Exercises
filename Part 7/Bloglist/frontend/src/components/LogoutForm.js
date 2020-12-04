import React from "react";
import { userLogout } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const LogoutForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLougout = async () => {
    dispatch(
      setNotification(`logged out, see next time ${user.name}`, "error")
    );
    await dispatch(userLogout());
  };

  return (
    <form onSubmit={handleLougout}>
      <table className={"labelStyle"}>
        <tbody>
          <tr>
            <td>{`${user.name} has logged in`}</td>
            <td>
              <button
                id="logout-button"
                className={"logoutButton"}
                type="submit"
              >
                {"logout"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default LogoutForm;
