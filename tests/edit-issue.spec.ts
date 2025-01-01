import { expect, test } from "@playwright/test";
import { readDataRecordsFromFile } from "../utils/read-data-records-from-file";
import { confirmDateFormat1 } from "../utils/confirm-date-format1";

test.beforeEach(async ({ page }) => {
  await page.goto("/project/list?page=1");
});

const records = readDataRecordsFromFile<{
  "Issue Title": string;
  Description: string;
  Category: string;
  Status: string;
  Priority: string;
  "Issue Type": string;
  "Assigned To": string;
  "Test Run": string;
  Severity: string;
  Environment: string;
  From: string;
  To: string;
  "Steps to reproduce": string;
  Expected: string;
}>("data/edit-issue-form-data.csv");

test.describe("Add Report", () => {
  records.forEach((record, index) => {
    test(`Add report @index: ${index}`, async ({ page }) => {
      console.log("@index: ", index);
      console.log("record: ", record);

      const projectAlphaLink = page.locator(
        '.card.grid-view:has(h4:has-text("Project Alpha")) a[href="/project/66fa0056e0d5ccc14eab0a2a"]'
      );
      await expect(projectAlphaLink).toBeVisible();
      await projectAlphaLink.click();
      await page.waitForURL("**/project/66fa0056e0d5ccc14eab0a2a");

      await page.locator("a.nav-link", { hasText: "Issues" }).click();
      await page.waitForURL("**/project/66fa0056e0d5ccc14eab0a2a/issue?page=1");

      const editButton = page.locator(
        'a[title="Edit"][data-id="676f5c4be97dafc4e3ab802a"]'
      );
      await expect(editButton).toBeVisible();
      await editButton.click();

      const modal = page.locator("#editIssue.modal.show");
      await expect(modal).toBeVisible();

      await modal.locator("#fIssueTitle").fill(record["Issue Title"]);

      await modal.locator("#fIssueDescription").fill(record.Description);

      await modal.locator("#fCategory").fill(record.Category);

      await modal.locator("#fStatus").fill(record.Status);

      await modal.locator("#fPriority").fill(record.Priority);

      await modal.locator("#fIssueType").fill(record["Issue Type"]);

      await modal.locator("#fAssignedTo").fill(record["Assigned To"]);

      await modal.locator("#fTestRun").fill(record["Test Run"]);

      await modal.locator("#fSeverity").fill(record.Severity);

      await modal.locator("#fEnvironment").fill(record.Environment);

      if (record.From && record.To) {
        const formattedFrom = confirmDateFormat1(record.From);
        const formattedTo = confirmDateFormat1(record.To);

        await modal.locator("#startDay").fill(formattedFrom);
        await modal.locator("#endDay").fill(formattedTo);
      }

      if (record["Steps to reproduce"]) {
        await modal
          .locator("#fStepsToReproduce")
          .fill(record["Steps to reproduce"]);
      }

      await modal.locator('button:has-text(" Save ")').click();
      await page.waitForTimeout(500);

      if (record.Expected === "Error") {
        await expect(modal).toBeVisible();
      } else {
        await expect(modal).not.toBeVisible();
      }
    });
  });
});
