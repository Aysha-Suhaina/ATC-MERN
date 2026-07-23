# Database Documentation

## Overview

Briefly explains that the application uses MongoDB with Mongoose and the purpose of the database.

---

## Collections

### User

**Purpose**

Stores user accounts and role information.

**Fields**

- `name` – User's full name.
- `email` – Unique email address used for authentication.
- `password` – Hashed password.
- `role` – User role (`admin`, `manager`, `employee`).
- `department` – Reference to the assigned department.
- `designation` – Reference to the assigned designation.
- `profileImage` – Profile image URL or path.
- `isActive` – Indicates whether the account is active.
- `resetOtp` – OTP used for password reset.
- `resetOtpExpireAt` – OTP expiration timestamp.

---

### Department

**Purpose**

Stores department information and the assigned manager.

**Fields**

- `name`
- `description`
- `manager`

---

### Designation

**Purpose**

Stores employee designations for each department.

**Fields**

- `name`
- `department`
- `isActive`

---

### Attendance

**Purpose**

Stores daily attendance records and approval status.

**Fields**

- `user`
- `date`
- `checkInTime`
- `checkOutTime`
- `totalHours`
- `attendanceStatus`
- `approvalStatus`
- `remarks`
- `approvedBy`
- `approvedAt`
- `rejectedBy`
- `rejectedAt`

**Notes**

- One attendance record is allowed per employee per day.
- Rejected attendance can be updated and resubmitted for approval.

---

### Conversation

**Purpose**

Represents a chat conversation between users.

**Fields**

- `participants`
- `isGroup`
- `lastMessage`

---

### Message

**Purpose**

Stores chat messages exchanged between users.

**Fields**

- `conversation`
- `sender`
- `receiver`
- `content`
- `isRead`

---

## Relationships

- A department can have multiple users.
- A department can have multiple designations.
- A user can have multiple attendance records over time.
- A conversation contains multiple messages.
- A user can participate in multiple conversations.
- A user can send and receive multiple messages.

---

## Constraints

- Email addresses must be unique.
- Department names must be unique.
- Attendance is restricted to one record per employee per day.
- All collections automatically maintain `createdAt` and `updatedAt` timestamps.