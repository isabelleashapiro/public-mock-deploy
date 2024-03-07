import { expect, test } from "@playwright/test";

/**
 * TESTS TO WRITE:
 * - load then view then search DONE
 * - load one file then load a different file DONE
 * - test every case for error messages DONE
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  //await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  // await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Submit")).toBeVisible();
});

test("after I click the submit button, nothing about the button changes", async ({
  page,
}) => {
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Submit")).toBeVisible();
  //await expect(page.getByLabel("Submit")).toHaveText()
});

/**
 * For now all "unit tests" are also going here
 */
test("after I click the button, incorrect command pushed, 'command not found' received", async ({
  page,
}) => {
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Test");
  await page.getByRole("button", { name: "Submit" }).click();
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[1]?.textContent : null;
  });
  expect(firstChild).toEqual("Command 'Test' not found.");
});

//TEST LOAD
test("run load with various inputs and expect premade responses", async ({
  page,
}) => {
  //SETUP
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //SUCCESSFUL COMMAND
  await page.getByLabel("Command input").fill("load_file ./star_csv");
  await page.getByRole("button", { name: "Submit" }).click();
  const child1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[1]?.textContent : null;
  });
  expect(child1).toEqual("Successfully loaded");

  //malformed COMMAND
  await page.getByLabel("Command input").fill("load_file ./malformed_csv");
  await page.getByRole("button", { name: "Submit" }).click();
  const child2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[2]?.textContent : null;
  });
  expect(child2).toEqual("Malformed csv file");

  //LOAD WRONG PARAMS
  await page.getByLabel("Command input").fill("load_file hi bye");
  await page.getByRole("button", { name: "Submit" }).click();
  const child3 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[3]?.textContent : null;
  });
  expect(child3).toEqual("Load requires 1 argument but you provided 2");

  //TEST FILE NOT FOUND
  await page.getByLabel("Command input").fill("load_file fakefile");
  await page.getByRole("button", { name: "Submit" }).click();
  const child4 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[4]?.textContent : null;
  });
  expect(child4).toEqual("File 'fakefile' not found");
});

//TEST VIEW -- not sure how to test viewing our actual datasets bc not sure what to "expect" (formatting wise)
test("run view with various inputs and expect premade responses", async ({
  page,
}) => {
  //SETUP
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //TEST VIEW FILE NOT LOADED
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  const child0 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[1]?.textContent : null;
  });
  expect(child0).toEqual(
    "View requires a file to have been loaded using load_file but no file is loaded yet"
  );

  //LOAD STAR DATA
  await page.getByLabel("Command input").fill("load_file ./star_csv");
  await page.getByRole("button", { name: "Submit" }).click();
  const child1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[2]?.textContent : null;
  });
  expect(child1).toEqual("Successfully loaded");

  //TEST VIEW INVALID ARGUMENTS
  await page.getByLabel("Command input").fill("view hello");
  await page.getByRole("button", { name: "Submit" }).click();
  const child2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[3]?.textContent : null;
  });
  expect(child2).toEqual("View requires 0 arguments but you provided 1");
});

//TEST BLANK VIEW
test("run view with blank load", async ({ page }) => {
  //SETUP
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //LOAD BLANK DATA
  await page.getByLabel("Command input").fill("load_file ./blank_csv");
  await page.getByRole("button", { name: "Submit" }).click();
  const child1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[1]?.textContent : null;
  });
  expect(child1).toEqual("Successfully loaded");

  //VIEW BLANK DATA
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  const child2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[2]?.textContent : null;
  });
  expect(child2).toEqual("");
});

//TEST SEARCH
test("run search and check that error/success messages correct", async ({
  page,
}) => {
  //SETUP
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //TEST SEARCH NO FILE LOADED
  await page.getByLabel("Command input").fill("search hi tim");
  await page.getByRole("button", { name: "Submit" }).click();
  const child0 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[1]?.textContent : null;
  });
  expect(child0).toEqual(
    "Search requires a file to have been loaded using load_file but no file is loaded yet"
  );

  //LOAD STAR DATA
  await page.getByLabel("Command input").fill("load_file ./star_csv");
  await page.getByRole("button", { name: "Submit" }).click();
  const child1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[2]?.textContent : null;
  });
  expect(child1).toEqual("Successfully loaded");

  //SUCCESSFUL SEARCH WITH HEADER NAME
  await page.getByLabel("Command input").fill("search Name Jasper");
  await page.getByRole("button", { name: "Submit" }).click();
  const child2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[3]?.textContent : null;
  });
  expect(child2).toEqual("100Jasper0.50.93.4");

  //SEARCH WRONG PARAMETERS
  await page.getByLabel("Command input").fill("search 1 1 2");
  await page.getByRole("button", { name: "Submit" }).click();
  const child3 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[4]?.textContent : null;
  });
  expect(child3).toEqual("Search requires 2 arguments but you provided 3");

  //SUCCESSFUL SEARCH WITH HEADER INDEX
  await page.getByLabel("Command input").fill("search 1 Jasper");
  await page.getByRole("button", { name: "Submit" }).click();
  const childx = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[5]?.textContent : null;
  });
  expect(childx).toEqual("100Jasper0.50.93.4");

  //SEARCH UNSUCCESSFUL --> first load blank data
  await page.getByLabel("Command input").fill("load_file ./blank_csv");
  await page.getByRole("button", { name: "Submit" }).click();
  const child4 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[6]?.textContent : null;
  });
  expect(child4).toEqual("Successfully loaded");

  //search blank data
  await page.getByLabel("Command input").fill("search 1 1");
  await page.getByRole("button", { name: "Submit" }).click();
  const child5 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[7]?.textContent : null;
  });
  expect(child5).toEqual("Search unsuccessful");
});

//TEST SEARCH WITHOUT HEADER
test("run search with file that has no header", async ({ page }) => {
  //SETUP
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //LOAD NO HEADER DATA
  await page
    .getByLabel("Command input")
    .fill("load_file ./star_csv_no_headers");
  await page.getByRole("button", { name: "Submit" }).click();
  const child1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[1]?.textContent : null;
  });
  expect(child1).toEqual("Successfully loaded");

  //SUCCESSFUL SEARCH WITH HEADER NAME
  await page.getByLabel("Command input").fill("search 1 Jasper");
  await page.getByRole("button", { name: "Submit" }).click();
  const child2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[2]?.textContent : null;
  });
  expect(child2).toEqual("100Jasper0.50.93.4");
});

//TEST SERIES OF LOAD/VIEW/SEARCH
test("run series of load, view, search", async ({ page }) => {
  //SETUP
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //LOAD NO HEADER DATA
  await page
    .getByLabel("Command input")
    .fill("load_file ./star_csv_no_headers");
  await page.getByRole("button", { name: "Submit" }).click();
  const child1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[1]?.textContent : null;
  });
  expect(child1).toEqual("Successfully loaded");

  //VIEW THE DATA
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  const child2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[2]?.textContent : null;
  });
  expect(child2).toContain("Isabelle");

  //LOAD DIFFERENT FILE
  await page.getByLabel("Command input").fill("load_file ./student_csv");
  await page.getByRole("button", { name: "Submit" }).click();
  const child3 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[3]?.textContent : null;
  });
  expect(child1).toEqual("Successfully loaded");

  //SEARCH NEW FILE
  await page.getByLabel("Command input").fill("search Height 72");
  await page.getByRole("button", { name: "Submit" }).click();
  const child4 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[4]?.textContent : null;
  });
  expect(child4).toEqual("Charlie202672170");
});

//TEST SEARCH WITH HEADER ON DATA WITH NO HEADER
test("run test with no header data but search with header", async ({
  page,
}) => {
  //SETUP
  //await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //LOAD NO HEADER DATA
  await page
    .getByLabel("Command input")
    .fill("load_file ./student_csv_no_headers");
  await page.getByRole("button", { name: "Submit" }).click();
  const child1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[1]?.textContent : null;
  });
  expect(child1).toEqual("Successfully loaded");

  //UNSUCCESSFUL SEARCH WITH HEADER NAME
  await page.getByLabel("Command input").fill("search Height 72");
  await page.getByRole("button", { name: "Submit" }).click();
  const child2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history ? history.children[2]?.textContent : null;
  });
  expect(child2).toEqual("Search unsuccessful");
});
