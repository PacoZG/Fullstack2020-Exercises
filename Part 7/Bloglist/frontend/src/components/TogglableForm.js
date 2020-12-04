import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const TogglableForm = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className={"normal"}>
      <div style={hideWhenVisible}>
        <button
          id="newblog-button"
          className={"button"}
          onClick={toggleVisibility}
        >
          {"new blog"}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {props.children}
          <button
            id="cancel-button"
            className={"button"}
            onClick={toggleVisibility}
          >
            {"cancel"}
          </button>
        </div>
      </div>
    </div>
  );
});

TogglableForm.displayName = "TogglableForm";
TogglableForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
export default TogglableForm;
