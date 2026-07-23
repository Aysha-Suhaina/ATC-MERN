# BUGS TRACKED  

## Authentication

* Invalid admin password does not display an error message.

## Department Management

* Prevent assigning multiple managers to the same department.

## Employee Management

* Filter designation dropdown based on the selected department.
* Manager module is missing search and filtering functionality available in the Admin module.

## Designation Management

* Employee count is incorrect after deleting a designation.

## Attendance

* Allow attendance resubmission only once.
* Resubmission should be allowed only on the same day.
* If the day has passed, resubmission should not be allowed and the attendance should retain its final status.

## Chat

* Newly created conversations do not appear in Recent Chats until the page is refreshed.
* Suggested fix: Move `RecentChat.jsx` state management into `Chat.jsx`.

## Reports

* Refactor `getDailyReport()` response.
* Return only the fields required by the frontend/export.
* Remove unnecessary fields such as `_id`, `__v`, and `updatedAt`.

## Frontend

* Organize styles into feature-level stylesheets.
* Suggested structure:

  * `auth.css`
  * `admin.css`
  * `attendance.css`
  * `chat.css`
  * `dashboard.css`
  * `employee.css`
  * `reports.css`
