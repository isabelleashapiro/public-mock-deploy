const starCSV = [["StarID", "Name", "X", "Y", "Z"],
                  ["100", "Jasper", "0.55", "0.9", "3.4"],
                  ["101", "Isabelle", "0.7", "1.8", "8.9"]];

const studentCSV = [["Name", "GradYear", "Height", "Weight"],
                  ["Jasper", "2027", "70", "180"],
                  ["Charlie", "2026", "72", "170"],
                  ["Ashley", "2025", "67", "120"],
                  ["Lucas", "2024", "80", "220"]];

const noHeadersStudentCSV = [["Jasper", "2027", "70", "180"],
                  ["Charlie", "2026", "72", "170"],
                  ["Ashley", "2025", "67", "120"],
                  ["Lucas", "2024", "80", "220"]];

const noHeadersStarCSV = [["100", "Jasper", "0.55", "0.9", "3.4"],
                  ["101", "Isabelle", "0.7", "1.8", "8.9"]];

const blankCSV = [[""]];

const csvFileMap: Map<string, string[][]> = new Map([
    ["./star_csv", starCSV],
    ["./student_csv", studentCSV],
    ["./blank_csv", blankCSV],
    ["./star_csv_no_headers", noHeadersStarCSV],
    ["./student_csv_no_headers", noHeadersStudentCSV]
]);

const fileNameToArgs: Map<string[][], string[][]> = new Map([
    [starCSV, [["Name", "Jasper"], ["1", "Jasper"]]],
    [studentCSV, [["Height", "72"], ["2", "72"]]],
    [noHeadersStarCSV, [["1", "Jasper"]]],
    [noHeadersStudentCSV, [["2", "72"]]]
]);

const starResults = [["100", "Jasper", "0.5", "0.9", "3.4"]]
const studentResults = [["Charlie", "2026", "72", "170"]];

const csvSearchMap: Map<string[][], string[][]> = new Map([
    [starCSV, starResults],
    [studentCSV, studentResults],
    [noHeadersStarCSV, starResults],
    [noHeadersStudentCSV, studentResults]
]);

var currentCSV = [[""]];
var isLoaded = false;


/**
 * Checks if the array of string arrays contains a specific string array
 *
 * @param arrays - An array of arrays of strings to check within 
 * @param targetArray - an array of strings that we are checking whether it lies within 'arrays'
 * @return true if the targetArray was found in array, false otherwise.
 */
function containsArray(arrays: string[][], targetArray: string[]): boolean {
    return arrays.some(array => array.every((value, index) => value === targetArray[index]));
}

/**
 * Displays the loaded csv file as a table, or displays a failure message
 *
 * @param args - An array of the strings which are the arguments provided by the user that followed the 'view' command
 * @return a react element containing either the failure message or the file table
 */
export function view(args: string[]){
    if (!isLoaded){
        return(
            <span>View requires a file to have been loaded using load_file but no file is loaded yet</span>
        );
    }
    if(args.length != 0){
        return(
            <span>View requires 0 arguments but you provided {args.length}</span>
        );
    }
    return convertStringList(currentCSV);
}

/**
 * Loads the provided csv file into the 'currentCSV' variable to be viewed or searched accordingly
 *
 * @param args - An array of the strings which are the arguments provided by the user that followed the 'load_file' command
 * @return a ReactElement containing either a success response or a failure method
 */
export function loadFile(args: string[]){
    if(args.length != 1){
        return(
            <span>Load requires 1 argument but you provided {args.length}</span>
        );
    }
    const fileName = args[0];
    const successResponse = <span>Successfully loaded</span>;
    if(fileName == "./malformed_csv"){
        return <span>Malformed csv file</span>;
    }
    if(csvFileMap.has(fileName)){
        currentCSV = csvFileMap.get(fileName)!;
        setLoadedTrue();
        return successResponse;
    }else{
        return <span>File '{fileName}' not found</span>;
    }
}

function setLoadedTrue(){
    if(!isLoaded){
        isLoaded = true;
    }
}
//search (from server) returns "error_bad_request" for any bad inputs. thus no checking parameters?
//args should be 

/**
 * Searches the currently loaded csv file by the column and value provided, outputting the row(s) that contain the
 * specified value in the specified column
 *
 * @param args - An array of the strings which are the arguments provided by the user that followed the 'search' command
 * @return a ReactElement containing either the row(s) that match the search or a failure method
 */
export function search(args: string[]){
    if (!isLoaded){
        return(
            <span>Search requires a file to have been loaded using load_file but no file is loaded yet</span>
        );
    }
    if(args.length != 2){
        return(
            <span>Search requires 2 arguments but you provided {args.length}</span>
        );
    }
    if(fileNameToArgs.has(currentCSV)){
        if(containsArray(fileNameToArgs.get(currentCSV)!, args)){
            return convertStringList(csvSearchMap.get(currentCSV)!);
        }
    }
    return <span>Search unsuccessful</span>
}

/**
 * Converts a provided array of string arrays to a ReactElement table
 *
 * @param data - A list of lists of strings to be converted to a ReactElement table
 * @return a ReactElement table generated from the provided list of lists of strings
 */
function convertStringList(data: string[][]){
    return (
        <table>
            {data.map((row) =>
            <tr>
                {row.map((element) =>
                <td>{element}</td>)}
            </tr>)
            }
        </table>
    );
}