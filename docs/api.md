# Attendance Management System API Documentation (MVP)

Base URL

http://localhost:5000/api

Authentication

All protected routes require:

Authorization: Bearer <jwt_token>

---

## 1. Health Check

### GET /

Response

{
"message": "Attendance Management API Running"
}

Status Code

200 OK

---

## 2. Submit Attendance

### POST /attendance

#### API: ``` http://localhost:5000/api/attendance/ ```

Role Access

Employee
Manager
Admin

Headers

Authorization: Bearer <token>

Request Body

{
"date": "2026-06-12",
"checkInTime": "2026-06-12T09:00:00Z",
"checkOutTime": "2026-06-12T18:00:00Z",
"attendanceStatus": "present",
"remarks": "Worked on payroll module"
}

Success Response

{
"success": true,
"statusCode": 201,
"message": "Attendance submitted",
"data": {
"_id": "6849abcd123",
"user": "6849user123",
"date": "2026-06-12T00:00:00.000Z",
"checkInTime": "2026-06-12T09:00:00.000Z",
"checkOutTime": "2026-06-12T18:00:00.000Z",
"totalHours": 9,
"attendanceStatus": "present",
"approvalStatus": "pending"
}
}

Validation Errors

400 Attendance already submitted

{
"message": "Attendance already submitted"
}

400 Missing Fields

{
"message": "Required fields missing"
}

---

## 3. View My Attendance

### GET /attendance/me

Role Access

Employee
Manager
Admin

Headers

Authorization: Bearer <token>

Success Response

{
"success": true,
"statusCode": 200,
"message": "Attendance fetched",
"data": [
{
"_id": "6849abcd123",
"date": "2026-06-12",
"attendanceStatus": "present",
"approvalStatus": "pending"
}
]
}

---

## 4. Get Pending Attendance

### GET /attendance/pending

Role Access

Manager
Admin

Headers

Authorization: Bearer <token>

Success Response

{
"success": true,
"statusCode": 200,
"message": "Pending attendance fetched",
"data": [
{
"_id": "attendance123",
"user": {
"_id": "user123",
"name": "John Doe"
},
"approvalStatus": "pending"
}
]
}

Forbidden Response

{
"message": "Access denied"
}

---

## 5. Approve Attendance

### PATCH /attendance/:attendanceId/approve

Role Access

Manager
Admin

Headers

Authorization: Bearer <token>

Request Body

{
"remarks": "Verified by manager"
}

Success Response

{
"success": true,
"statusCode": 200,
"message": "Attendance approved",
"data": {
"approvalStatus": "approved",
"approvedAt": "2026-06-12T11:00:00Z"
}
}

Not Found

{
"message": "Attendance not found"
}

---

## 6. Reject Attendance

### PATCH /attendance/:attendanceId/reject

Role Access

Manager
Admin

Headers

Authorization: Bearer <token>

Request Body

{
"remarks": "Incorrect checkout time"
}

Success Response

{
"success": true,
"statusCode": 200,
"message": "Attendance rejected",
"data": {
"approvalStatus": "rejected"
}
}

---

## 7. Get User Profile

### GET /users/profile

Role Access

Authenticated Users

Headers

Authorization: Bearer <token>

Success Response

{
"success": true,
"statusCode": 200,
"message": "Profile fetched",
"data": {
"_id": "user123",
"name": "John Doe",
"email": "[john@example.com](mailto:john@example.com)",
"role": "employee",
"department": "Engineering",
"designation": "Backend Developer"
}
}

---

## 8. Update User Profile

### PUT /users/profile

Role Access

Authenticated Users

Headers

Authorization: Bearer <token>

Request Body

{
"name": "John Doe",
"department": "Engineering",
"designation": "Backend Developer"
}

Success Response

{
"success": true,
"statusCode": 200,
"message": "Profile updated",
"data": {
"name": "John Doe",
"department": "Engineering",
"designation": "Backend Developer"
}
}
