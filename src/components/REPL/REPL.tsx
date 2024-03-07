import { useState } from "react";
import "../../styles/main.css";
import { REPLHistory } from "../history/REPLHistory";
import { REPLInput } from "./REPLInput";
import { HistoryElement } from "../history/historyElement";

/**
 * displays the REPLHistory, which contains all of the past command results, and displays
 * the REPLInput, which contains all of the user input functionality
 *
 * @return both the REPLHistory and the REPLInput
 */
export default function REPL() {
  const [history, setHistory] = useState<HistoryElement[]>([]);

  return (
    <div className="repl">
      <REPLHistory history={history} />
      <hr></hr>
      <REPLInput history={history} setHistory={setHistory} />
    </div>
  );
}
