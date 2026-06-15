Postman Test Flow
Test 1

Server running?

GET /

Expected:

{
  "message": "Attendance Management API Running"
}
Test 2

Submit attendance

POST /api/attendance

Body:

{
  "date":"2026-06-12",
  "checkInTime":"2026-06-12T09:00:00Z",
  "checkOutTime":"2026-06-12T18:00:00Z",
  "attendanceStatus":"present",
  "remarks":"Worked on attendance module"
}

Expected:

{
  "success": true
}
Test 3

Submit same attendance again

Expected:

{
  "message":"Attendance already submitted"
}

Status:

400 Bad Request
Test 4

Get attendance history

GET /api/attendance/me

Expected:

Array with the attendance you just created.

Test 5

Manager gets pending attendance

GET /api/attendance/pending

Expected:

Attendance record appears with:

{
  "approvalStatus":"pending"
}
Test 6

Approve attendance

PATCH /api/attendance/{id}/approve

Body:

{
  "remarks":"Approved"
}

Expected:

{
  "approvalStatus":"approved"
}
Test 7

Reject another attendance

PATCH /api/attendance/{id}/reject

Expected:

{
  "approvalStatus":"rejected"
}