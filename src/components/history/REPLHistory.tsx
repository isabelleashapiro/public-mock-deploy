import "../../styles/main.css";
import { HistoryElement } from "./historyElement";

/**
 * an interface that contains a history field, which is a list of all of the past HistoryElements
 */
interface REPLHistoryProps {
  history: HistoryElement[];
}

/**
 * loops through the history (list of HistoryElements) and displays the past command results (differently depending
 * on if the program was in brief or verbose mode)
 *
 * @param props a REPLHistoryProps interface containing the history field
 * @return an html container that contains a 'paragraph', which contains all of the command history
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      <p>Command history:</p>
      {props.history.map((command) =>
        command.isBrief ? (
          <div className="repl-history-output">
            <p>{command.response}</p>
          </div>
        ) : (
          <div className="repl-history-output">
            <p>Command: {command.fullCommand}</p>
            <p>Ouput: {command.response}</p>
          </div>
        )
      )}
    </div>
  );
}
