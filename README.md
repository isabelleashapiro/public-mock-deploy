> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

Project Name: Mock
Team Members: Charlie Olcott (colcott) Isabelle Shapiro (iashapir)
Total Estimated Time: 10 hours
Repo: https://github.com/cs0320-s24/mock-colcott-iashapir

# Design Choices

High Level Design:
App returns a ReactElement that inserts LoginButton and REPL, two tsx files containing export functions.

LoginButton:
Contains two buttons: a login button that allows user to login and a sign out button that allows users to sign out. Which button is displayed is dependent on the value of the isLoggedIn flag, which is toggled on button clicks.

REPL:
In this React file, we setup our REPLHistory and REPLInput functions with the same shared HistoryElement as props. We do this so that when the user inputs a request and we output a response, we can get those outputs from the input component to the history component to display permanently.

REPLHistory:
This file exports the REPLHistory function which displays all previous requests and responses the user inputted each time the site re-renders. It does this in a scrollable display. REPLHistory prints in one of two ways: brief (just the response) or verbose (response and command). It does this by accessing the isBrief field in the HistoryElement passed in as props.

REPLInput:
This handles the user's input, calls inputted commands if valid, and adds commands and responses to a list of HistoryElements to be displayed by REPLHistory. In this file, we store a functionMap, which maps string inputs for functions to the functions we want them to call. All a developer needs to do to add to this map is import their function and add it to the map. REPLInput has two internal functions, HandleMode and HandleSubmit, the first of which switches the isBrief flag stored for each HistoryElement in the list. That way, when the entry is displayed, it can either be brief or verbose based on what the user wanted.
HandleSubmit is what is called when the user clicks the 'Submit' button. It will create a HistoryElement to add to History (via the setHistory function). This function also checks whether the command is in our functionMap before calling it.

CSVFunctions:
This file stores the functions we import into REPLInput to populate the functionMap we use there. For now, we have several mocked datasources to display on various command inputs. These datasources are mapped to their input filepaths and arguments for search so that we can accurately mock our backend's functionality. We store a global variable here that contains whether or not a file is loaded. Since this is handled in the backend, it will likely be deleted later along with all of our other useless maps, data, and time-consuming design elements that serve no real purpose!

Load-File Function: Checks arguments length and whether or not our file map contains the filepath we inputted.

View Function: makes sure a file has been loaded before displaying loaded file's data

Search Function: Checks arguments length, makes sure a file has been loaded, and then if arguments correspond to a file and then a search result, displays that search result. (This function will be largely unnecessary once backend is integrated.)

# Errors/Bugs

None that we know of.

# Tests

Since all of our functions return ReactElements, we test all of our error messages and various inputs using PlayWright and accessing the messages that display on the screen in our history after various command inputs.

Functionality of the website that we test:

- login button
- submit function
- input box text

Tests that verify CSV Functionality and Front End Functionality:

- Tests load-file with successful command, loading malformed data, wrong param numbers, and invalid filepath
- Tests view when a file hasn't been loaded, tests successful view, tests invalid arguments to view, tests view on a blank file
- Tests search without a file loaded, with and without header data, with column index and column name, with invalid argument numbers, invalid search terms, and on blank data
- Tests series of loads/views/search to ensure that we can switch between files

All of our tests also ensure that all previous data is still being displayed after submitting new requests because they access children of page in ascending order.

# How to

Run Tests: in terminal, "npm run test"

Run Mock: in terminal, "npm run." open the link printed.
Click "Login"
Input following commands to use csv functionality:

- "mode" + "brief" or "verbose"
  - switch mode to either brief (response only) or verbose (command and response)
- "load-file" + filepath
  - loads a csv to view or search
  - make sure to run this before running view or search!
- "view"
  - takes no arguments
  - make sure to load a file before running view
- "search" + column index/name + search term
  - can enter either a column name or column index to search
  - make sure to load a file before running search

For Developers:
To add functions to our function map, make sure your function takes in a string[] of arguments and returns a ReactElement that is what your function will display. Simply import the function into REPLInput and add it (along with its command) to the map.

# Collaboration
