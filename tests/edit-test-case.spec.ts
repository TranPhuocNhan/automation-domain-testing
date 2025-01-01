// import { expect, test } from "@playwright/test";
// import { readDataRecordsFromFile } from "../utils/read-data-records-from-file";
// import { conformDateFormat } from "../utils/confirm-date-format";

// test.beforeEach(async ({ page }) => {
//   await page.goto("/project/list?page=1");
// });

// const records = readDataRecordsFromFile<{
//   "Test Case Title": string;
//   "Select Module": string;
//   Priority: string;
//   Precondition: string;
//   Description: string;
//   Tag: string;
//   Expected: string;
// }>("data/edit-test-case-form-data.csv");

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
//       await page.locator("a.nav-link", { hasText: "Test Cases" }).click();
//       await page.waitForURL(projectURL + "/test-case?page=1");

//       // Open the Edit Test Case modal
//       const firstEditButton = page.locator(
//         'tbody tr:first-child a[title="Edit"]'
//       );

//       // Kiểm tra xem nút có tồn tại không
//       await expect(firstEditButton).toBeVisible();

//       // Nhấp vào nút Edit
//       await firstEditButton.click();

//       // Kiểm tra modal mở (nếu có)
//       const modal = page.locator("#editTestCase");
//       await expect(modal).toBeVisible();

//       // Điền dữ liệu vào form
//       await page.locator("#nameTestCaseEdit").fill(record["Test Case Title"]);
//       if (record["Test Case Title"]) {
//       }
//       await page.locator("#nameModuleEdit").fill(record["Select Module"]);

//       if (record["Select Module"]) {
//       }
//       await page.locator("#priorityTestCaseEdit").fill(record.Priority);

//       if (record.Priority) {
//       }
//       await page.locator("#preconditionTestCaseEdit").fill(record.Precondition);
//       if (record.Precondition) {
//       }
//       await page.locator("#descriptionTestCaseEdit").fill(record.Description);
//       if (record.Description) {
//       }

//       if (record.Tag) {
//         // Nhấn nút "Add Tag" để hiển thị ô nhập Tag
//         const addTagButton = page.locator("#btn-add-tag-edit");
//         await expect(addTagButton).toBeVisible(); // Đảm bảo nút hiển thị
//         await addTagButton.click(); // Nhấn nút để hiển thị ô nhập Tag

//         // Chờ ô nhập Tag hiển thị
//         const tagInput = page.locator("#nameTagsEdit");
//         await page.waitForSelector("#nameTagsEdit", { state: "visible" });

//         // Điền giá trị vào ô nhập Tag
//         await tagInput.fill(record.Tag);

//         // Nhấn Enter để thêm Tag
//         await page.keyboard.press("Enter");

//         // Kiểm tra Tag đã được thêm vào danh sách
//         const addedTag = page.locator(".tagsinput .tag-text", {
//           hasText: record.Tag,
//         });
//         await expect(addedTag).toBeVisible();
//       }

//       // Nhấn nút "Save"
//       await page.locator('#editTestCase button:has-text("Save")').click();
//       await page.waitForTimeout(500);
//       // Kiểm tra kết quả
//       if (record.Expected === "Error") {
//         // Kiểm tra thông báo lỗi hoặc modal vẫn mở
//         expect(await page.isVisible("#editTestCase.modal")).toBe(true);
//       } else {
//         // Kiểm tra modal đóng
//         expect(await page.isVisible("#editTestCase.modal")).toBe(false);
//       }
//     });
//   });
// });
