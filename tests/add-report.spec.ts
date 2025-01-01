// import { expect, test } from "@playwright/test";
// import { readDataRecordsFromFile } from "../utils/read-data-records-from-file";
// import { conformDateFormat } from "../utils/confirm-date-format";

// test.beforeEach(async ({ page }) => {
//   await page.goto("/project/list?page=1");
// });

// const records = readDataRecordsFromFile<{
//   Title: string;
//   "Report Type": "[E]" | "[NE]" | (string & {});
//   "Start Date": string;
//   "End Date": string;
//   AccessingScheduling: string;
//   Expected: "Add report success" | "Error";
// }>("data/add-report-form-data.csv");

// test.describe("Add Report", () => {
//   records.forEach((record, index) => {
//     test(`Add report @index: ${index}`, async ({ page }) => {
//       console.log("@index: ", index);
//       console.log("record: ", record);

//       const projectURL = await page.evaluate(() =>
//         document.querySelector(".card a")?.getAttribute("href")
//       );

//       if (!projectURL) throw Error("No project found");

//       // Navigate to the project and reports section
//       await page.locator(".card a").first().click();
//       await page.waitForURL(projectURL);
//       await page.locator("a.nav-link", { hasText: "Reports" }).click();
//       await page.waitForURL(projectURL + "/report?page=1");

//       // Open the Add Report modal
//       await page.click("button[data-bs-target='#addReport']");

//       // Fill the form
//       await page.locator("#title").fill(record.Title); // Fill the Title
//       record["Report Type"] &&
//         (await page.locator("#fReports").selectOption(record["Report Type"])); // Select the Report Type
//       record["Start Date"] &&
//         (await page
//           .locator("#startDate")
//           .fill(conformDateFormat(record["Start Date"]))); // Fill Start Date
//       record["End Date"] &&
//         (await page
//           .locator("#endDate")
//           .fill(conformDateFormat(record["End Date"]))); // Fill End Date

//       if (record.AccessingScheduling === "Check") {
//         const isChecked = await page
//           .locator("#fAccessingAndScheduling")
//           .isChecked();
//         if (!isChecked) {
//           await page.locator("#fAccessingAndScheduling").check(); // Enable Accessing & Scheduling if required
//         }
//       } else {
//         const isChecked = await page
//           .locator("#fAccessingAndScheduling")
//           .isChecked();
//         if (isChecked) {
//           await page.locator("#fAccessingAndScheduling").uncheck(); // Disable Accessing & Scheduling if required
//         }
//       }

//       // Submit the form
//       await page.locator("button:has-text('Save and add')").click();
//       await page.waitForTimeout(500);
//       // Validate the result based on the expected outcome
//       if (record.Expected === "Add report success") {
//         expect(await page.isVisible("#addReport.modal")).toBe(false);
//       } else {
//         expect(await page.isVisible("#addReport.modal")).toBe(true);
//       }
//     });
//   });
// });
