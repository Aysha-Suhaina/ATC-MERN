# TESTING.md

## Overview

This document provides a manual testing checklist for verifying the application's functionality before deployment or after implementing new features.

---

## Authentication

* Register a new employee account.
* Login with valid credentials.
* Reject invalid login credentials.
* Logout successfully.
* Reset password using OTP.
* Verify JWT authentication and protected routes.

---

## Dashboard

### Admin Dashboard

* Verify dashboard statistics.
* Verify attendance summary.
* Verify daily report.
* Verify recent activity.

### Manager Dashboard

* Verify department statistics.
* Verify pending attendance count.
* Verify employee overview.

### Employee Dashboard

* Verify personal attendance summary.
* Verify attendance status.

---

## Department Management

* Create a department.
* Update department details.
* Delete a department.
* Assign a manager.
* Change department manager.
* Remove department manager.
* Verify department employee listing.

---

## Designation Management

* Create a designation.
* Update a designation.
* Delete a designation.
* Verify department-specific designations.

---

## Employee Management

* Create an employee.
* Update employee details.
* Deactivate an employee.
* Reactivate an employee.
* Search employees.
* Filter employees.
* Verify department and designation assignment.

---

## Attendance

### Employee

* Submit attendance.
* Edit attendance.
* Resubmit rejected attendance.
* View attendance history.

### Manager

* View pending attendance.
* Approve attendance.
* Reject attendance.
* View department attendance history.

### Admin

* View all attendance.
* View pending attendance.
* Approve attendance.
* Reject attendance.
* Delete attendance records.

---

## Chat

* Start a new conversation.
* Send messages.
* Receive messages in real time.
* Verify typing indicator.
* Verify online/offline status.
* Verify read receipts.
* Verify conversation history.

---

## Reports

* Export attendance as CSV.
* Export attendance as Excel.
* Export employee reports.
* Export department reports.

---

## Profile

* View profile.
* Update profile information.
* Verify profile image upload.

---

## Role-Based Access Control

### Admin

* Access all modules.
* Manage employees.
* Manage departments.
* Manage designations.
* Manage attendance.
* Export reports.

### Manager

* Access only assigned department.
* Manage department attendance.
* Manage department designations.
* View department employees.

### Employee

* Manage personal attendance.
* Access chat.
* Update profile.

---

## API Validation

* Verify protected endpoints require authentication.
* Verify role-based authorization.
* Verify validation errors are handled correctly.
* Verify appropriate HTTP status codes are returned.

---

## Error Handling

* Verify validation messages.
* Verify unauthorized access handling.
* Verify forbidden access handling.
* Verify server error responses.
* Verify network failure handling.

---

## Browser Testing

* Google Chrome
* Microsoft Edge

---

## Final Checklist

* All features function as expected.
* No console errors.
* No server errors.
* No broken routes.
* No UI alignment issues.
* Role permissions work correctly.
* Real-time chat functions correctly.
* Reports export successfully.
