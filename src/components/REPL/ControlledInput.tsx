import "../../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * An interface containing a value field, which is a string representing the input's value and a
 * setValue fuction which updates the value field and an ariaLabel field, which is a string
 */
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * @param value the value from the passed in ControlledInputProps interface
 * @param setValue the setValue function from the passed in ControlledInputProps interface
 * @param ariaLabel the ariaLabel from the passed in ControlledInputProps interface
 * @return an html input object that allows the user to input text.
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
