# API Documentation

## Base URL

```http
http://localhost:4000/api
```

## Authentication

Protected routes require a valid JWT.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Authentication

### POST `/auth/register`

Registers a new employee account.

**Access:** Public

---

### POST `/auth/login`

Authenticates a user and returns a JWT token.

**Access:** Public

---

### POST `/auth/logout`

Logs out the authenticated user.

**Access:** Authenticated User

---

### POST `/auth/send-reset-otp`

Sends a password reset OTP.

**Access:** Public

---

### POST `/auth/reset-password`

Resets the user's password using a valid OTP.

**Access:** Public

---

## Users

### GET `/users/profile`

Returns the authenticated user's profile.

**Access:** Authenticated User

---

### PUT `/users/profile`

Updates the authenticated user's profile.

**Access:** Authenticated User

---

### GET `/users/employees`

Returns all employees.

**Access:** Admin

---

### GET `/users/employees/:id`

Returns employee details.

**Access:** Admin

---

### POST `/users/employees`

Creates a new employee.

**Access:** Admin

---

### PUT `/users/employees/:id`

Updates an employee.

**Access:** Admin

---

### PATCH `/users/employees/:id/deactivate`

Deactivates an employee account.

**Access:** Admin

---

### PATCH `/users/employees/:id/reactivate`

Reactivates an employee account.

**Access:** Admin

---

### GET `/users/managers`

Returns all managers.

**Access:** Admin

---

### GET `/users/attendance`

Returns all attendance records.

**Access:** Admin

---

### GET `/users/chat-users`

Returns available chat users.

**Access:** Authenticated User

---

### GET `/users/manager/my-employees`

Returns employees belonging to the manager's department.

**Access:** Manager

---

### PATCH `/users/manager/employees/:employeeId/designation`

Assigns or updates an employee's designation.

**Access:** Manager

---

## Departments

### POST `/departments`

Creates a department.

**Access:** Admin

### GET `/departments`

Returns all departments.

**Access:** Public / Authenticated

### GET `/departments/:id`

Returns a department by ID.

### PUT `/departments/:id`

Updates a department.

### DELETE `/departments/:id`

Deletes a department.

### PATCH `/departments/:id/assign-manager`

Assigns a department manager.

### PATCH `/departments/:id/change-manager`

Changes the assigned manager.

### PATCH `/departments/:id/remove-manager`

Removes the current manager.

### GET `/departments/:id/employees`

Returns employees within a department.

### GET `/departments/my`

Returns the authenticated manager's department.

**Access:** Manager

### PUT `/departments/my`

Updates the manager's department details.

**Access:** Manager

---

## Designations

### POST `/designations`

Creates a designation.

### GET `/designations`

Returns all designations.

### GET `/designations/:id`

Returns a designation by ID.

### GET `/designations/department/:departmentId`

Returns designations for a department.

### PUT `/designations/:id`

Updates a designation.

### DELETE `/designations/:id`

Deletes a designation.

### GET `/designations/my`

Returns designations for the manager's department.

**Access:** Manager

### POST `/designations/my`

Creates a designation within the manager's department.

**Access:** Manager

### PUT `/designations/my/:id`

Updates a department designation.

**Access:** Manager

### DELETE `/designations/my/:id`

Deletes a department designation.

**Access:** Manager

---

## Attendance

### POST `/attendance`

Submits attendance.

### GET `/attendance`

Returns all attendance records.

**Access:** Admin, Manager

### GET `/attendance/me`

Returns the authenticated employee's attendance history.

### GET `/attendance/pending`

Returns pending attendance requests.

**Access:** Admin

### GET `/attendance/manager/pending`

Returns pending attendance requests for the manager's department.

**Access:** Manager

### GET `/attendance/manager/history`

Returns attendance history for the manager's department.

**Access:** Manager

### GET `/attendance/:attendanceId`

Returns attendance details.

### PATCH `/attendance/:attendanceId/approve`

Approves attendance.

**Access:** Admin, Manager

### PATCH `/attendance/:attendanceId/reject`

Rejects attendance.

**Access:** Admin, Manager

### PUT `/attendance/:id/resubmit`

Resubmits rejected attendance.

**Access:** Employee

### DELETE `/attendance/:attendanceId`

Deletes an attendance record.

**Access:** Admin

---

## Conversations

### GET `/conversations`

Returns all conversations.

### GET `/conversations/my`

Returns conversations for the authenticated user.

### POST `/conversations/open`

Creates or opens an existing conversation.

### GET `/conversations/:id/messages`

Returns all messages within a conversation.

---

## Messages

### GET `/messages/:conversationId`

Returns messages for a conversation.

### POST `/messages`

Sends a new message.

### PATCH `/messages/:conversationId/read`

Marks conversation messages as read.

---

## Reports

### GET `/reports/:type/csv`

Exports report data in CSV format.

### GET `/reports/:type/excel`

Exports report data in Excel format.

### GET `/reports/:type/:id/csv`

Exports a specific report in CSV format.

### GET `/reports/:type/:id/excel`

Exports a specific report in Excel format.

---

## Dashboard

### GET `/dashboard/admin`

Returns dashboard statistics.

**Access:** Admin

### GET `/dashboard/report/daily`

Returns the daily attendance report.

**Access:** Admin