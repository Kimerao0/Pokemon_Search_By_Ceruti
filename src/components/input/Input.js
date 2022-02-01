import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./Input.scss";

const Input = (props) => {
  const inputHasError = props.isInValid ? "input-container error-inside" : "";
  return (
    <div className={`input-container ${inputHasError}`}>
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChangeHandler(e)}
        onBlur={(e) => props.onBlurHandler(e)}
        placeholder={props.placeholder}
      />
      {props.value && props.value.length > 0 && (
        <FontAwesomeIcon icon={faTimesCircle} onClick={props.reset} />
      )}
      {props.isInValid && <p className="error-input">{props.errorMessage}</p>}
    </div>
  );
};

export default Input;
