import { ReactElement } from 'react';

/**
 * An interface representing a single element in the command history. Contains:
 * a response field, which is a ReactElement that displays the element
 * a command field, which is a string that contains the command that was called to produce the element
 * an isBrief field, which is a boolean that is true if the program was in brief mode at the time the 
 * command produced the element
 * a fullCommand field, which is a string that holds the entirety of the input submitted by the user
 */
export interface HistoryElement {
  response: ReactElement;
  command: string;
  isBrief: boolean;
  fullCommand: string;
}