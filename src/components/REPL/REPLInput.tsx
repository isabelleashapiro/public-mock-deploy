import "../../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { HistoryElement } from "../history/historyElement";
import { ReactElement } from "react";

import { view, search, loadFile } from "../CSV/CSVFunctions";

/**
 * An interface containing a history field, which is a list of HistoryElements and a
 * setHistory fuction which updates the history field
 */
interface REPLInputProps {
  history: HistoryElement[];
  setHistory: Dispatch<SetStateAction<HistoryElement[]>>;
}

/**
 * Creates an html container for the user input area which contains a ControlledInput for user to input commands,
 * as well as a 'Submit' button for users to click in order to submit their input.
 *
 * @param props - A REPLInputProps interface containing a list of HistoryElements and a setHistory function
 * @return an html container that contains a fieldset for the REPL input along with a 'Submit' button
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  const [isBrief, setIsBrief] = useState<boolean>(true);

  /**
   * A map that maps function names (as strings and with their arguments as an array of strings) to
   * their respective functions that return ReactElements.
   */
  const functionMap: {
    [key: string]: (args: string[]) => ReactElement;
  } = {
    mode: handleMode,
    view: view,
    search: search,
    load_file: loadFile,
  };

  /**
   * Switches the program's 'mode' to brief or verbose mode by changing the isBrief variable to either true or false
   * respectively.
   *
   * @param args - An array of the strings which are the arguments provided by the user that followed the 'mode' command
   * @return a react element containing either a failure message or a success message
   */
  function handleMode(args: string[]) {
    if (args.length != 1) {
      return (
        <span>
          Mode takes one argument, 'brief' or 'verbose', but you provided{" "}
          {args.length}
        </span>
      );
    }
    if (args[0] == "brief") {
      if (isBrief) {
        return <span>You are already in brief mode</span>;
      }
      setIsBrief(true);
      return <span>Success! You have switched to brief mode</span>;
    } else if (args[0] == "verbose") {
      if (!isBrief) {
        return <span>You are already in verbose mode</span>;
      }
      setIsBrief(false);
      return <span>Success! You have switched to verbose mode</span>;
    } else {
      return (
        <span>
          Mode argument must be either 'brief' or 'verbose', but you provided{" "}
          {args[0]}
        </span>
      );
    }
  }

  /**
   * Called when the Submit button is clicked. Tokenizes the user input and calls the appropriate function based on the
   * command specified by the user with the rest of the input's tokens as the arguments to the function call.
   * Updates the REPL history by calling setHistory, adding the result of the function call to the REPL history
   *
   * @param commandString - the string of user input containing the command to be run
   */
  function handleSubmit(commandString: string) {
    const tokens = commandString.split(" ");
    const command = tokens[0];
    var functionResult: HistoryElement = {
      response: <span></span>,
      command: command,
      isBrief: isBrief,
      fullCommand: commandString,
    };
    tokens.shift();
    if (!(command in functionMap)) {
      functionResult.response = <span>Command '{command}' not found.</span>;
    } else {
      functionResult.response = functionMap[command](tokens);
    }
    // if (isBrief) {
    props.setHistory([...props.history, functionResult]);
    // } else {
    //   props.setHistory([
    //     ...props.history,
    //     "Command: " + commandString + " Output: " + functionResult,
    //   ]);
    // }
    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button aria-label="Submit" onClick={() => handleSubmit(commandString)}>
        Submit
      </button>
    </div>
  );
}
