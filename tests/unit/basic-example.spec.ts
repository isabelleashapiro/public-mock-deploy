/*
  Demo: test ordinary Java/TypeScript
*/

import { expect, test } from "vitest";
//import { expect, test } from "@playwright/test";

// all exports from main will now be available as main.X
// import * as main from '../mock/src/main';
import * as main from "../../src/main";
import * as csv from "../../src/components/CSVFunctions";

test("is 1 + 1 = 2?", () => {
  expect(1 + 1).toBe(2);
});

//unit tests not working because they all return jsx elements...maybe we just
//have to do all of our tests the other way (as in App)

// test("main.zero() should return 0", async ({ page }) => {
//   const actualElement = await page.evaluate(() => {
//     return csv.loadfile(["hello!"]);
//   });

//   const expectedElement = <p>Successfully loaded</p>;

//   await expect(actualElement).toMatchElement(expectedElement);
// });

//NOTE CANNOT TEST HANDLEMODE BC NOT AN EXPORT FUNCTION??

//test handleLoad
// Notice how you can test vanilla TS functions using Playwright as well!
//test handleView

//test handleSearch

/**
 * UNIT TEST IDEAS:
 * - need to test all the functions we wrote
 *    -handleMode -> test return values ig
 *    -
 */

// For more information on how to make unit tests, visit:
// https://jestjs.io/docs/using-matchers
