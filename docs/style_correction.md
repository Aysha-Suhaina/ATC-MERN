### Shared header component

`client/src/components/ui/PageHeader.jsx`

Line ~3

Current:

```jsx
<div className="split-layout-header">
```

Suggestion:

```jsx
<div className="split-layout-header">
```


Reason: `page-header` is not defined in `theme.css`; `split-layout-header` is the shared responsive header layout.

Line ~5 and ~7

Current:

```jsx
<h1>{title}</h1>
<p>{subtitle}</p>
```

Suggestion:

```jsx
<h1 className="page-title">{title}</h1>
<p className="section-description">{subtitle}</p>
```



### Manager page headers

`pages/manager/MyEmployees.jsx`

Line ~38 and ~40

Current:

```jsx
<div className="page-header">
<h1>My Employees</h1>
```

Suggestion:

```jsx
<div className="split-layout-header">
<h1 className="page-title">My Employees</h1>
```

Reason: `page-header` has no theme definition; shared header and title classes exist.

`pages/manager/ManagerDesignation.jsx`

Line ~54 and ~56

Suggestion: Replace `page-header` with `split-layout-header` and add `className="page-title"` to the `h1`.

`pages/manager/ManagerDepartment.jsx`

Line ~60 and ~62

Suggestion: Replace `page-header` with `split-layout-header` and add `className="page-title"` to the `h1`.

`pages/manager/AttedanceHistory.jsx`

Line ~36 and ~38

Suggestion: Replace `page-header` with `split-layout-header` and add `className="page-title"` to the `h1`.

`pages/manager/AttendanceApproval.jsx`

Line ~31 and ~33

Suggestion: Replace `page-header` with `split-layout-header` and add `className="page-title"` to the `h1`.

Reason: Same missing legacy header class and bypassed typography utility.

---

### Undefined two-column layout

`pages/admin/AdminDashboard.jsx`

Line ~178

Current:

```jsx
<div className="grid-2">
```

Suggestion:

```jsx
<div className="content-grid">
```

Reason: `grid-2` does not exist in `theme.css`; `content-grid` is the available shared two-column grid.

`pages/admin/Reports.jsx`

Lines ~72 and ~100

Current:

```jsx
<div className="grid-2">
```

Suggestion:

```jsx
<div className="content-grid">
```

Reason: Same undefined class; `content-grid` is the shared two-column layout.

---

### Undefined table containers and missing responsive wrapper

`components/reports/AttendanceTrend.jsx`

Line ~5

Current:

```jsx
<div className="table-container">
```

Suggestion:

```jsx
<div className="table-wrapper">
```

Reason: `table-container` is not defined in `theme.css`; `table-wrapper` provides the shared responsive horizontal-scroll behavior.

`components/reports/MonthlySummary.jsx`

Line ~5

Suggestion: Replace `table-container` with `table-wrapper`.

Reason: Same undefined class and missing shared table wrapper.

The following tables already use `className="table"` but are not wrapped in the shared responsive `table-wrapper`:

- `pages/admin/EmployeeManagement/EmployeeList.jsx`, line ~169
- `pages/admin/AttendanceManagement/PendingAttendance.jsx`, line ~87
- `pages/admin/AttendanceManagement/AdminAttendanceMgmt.jsx`, line ~156
- `components/department/DepartmentList.jsx`, line ~50
- `components/designation/DesignationList.jsx`, line ~38
- `pages/employee/Dashboard.jsx`, line ~173
- `pages/manager/MyEmployees.jsx`, line ~65
- `pages/manager/ManagerDesignation.jsx`, line ~89
- `pages/manager/AttedanceHistory.jsx`, line ~59
- `pages/manager/AttendanceApproval.jsx`, line ~47

Suggestion:

```jsx
<div className="table-wrapper">
  <table className="table">
```

Reason: Reuses the responsive table behavior explicitly supplied by `theme.css`.

---

### Empty states bypassing the design system

`components/department/DepartmentList.jsx`

Line ~42

Current:

```jsx
<div className="empty-state">
```

Suggestion:

```jsx
<div className="empty">
```

Reason: `empty-state` is not defined in `theme.css`; `empty` is the shared empty-state container.

`components/designation/DesignationList.jsx`

Line ~32

Current:

```jsx
<p className="empty-state">
```

Suggestion:

```jsx
<div className="empty">
```

Reason: Same undefined legacy class; the shared empty-state styling is provided by `empty`.

`pages/admin/AttendanceManagement/PendingAttendance.jsx`

Line ~76

Current:

```jsx
<div style={{ textAlign: "center", padding: "40px" }}>
```

Suggestion:

```jsx
<div className="empty">
```

Reason: The inline empty-state layout duplicates the shared `empty` utility.

---

### Unsupported badge variants

`components/designation/DesignationList.jsx`

Line ~72

Current:

```jsx
<span className="badge badge-info">
```

Suggestion: Remove `badge-info` or map it to an existing semantic variant only if appropriate:

```jsx
<span className="badge badge-success">
```

Reason: `badge-info` does not exist in `theme.css`. Available variants are `badge-success`, `badge-warning`, and `badge-danger`.

`components/reports/AttendanceTrend.jsx`

Lines ~21 and ~27

Current:

```jsx
<span className="status-badge approved">
<span className="status-badge rejected">
```

Suggestion:

```jsx
<span className="badge badge-success">
<span className="badge badge-danger">
```

Reason: `approved` and `rejected` are only defined for `approval-badge`, not `status-badge`. For present/absent counts, the standard semantic badge variants are the matching shared styles.

---

### Form consistency

`pages/admin/DesignationManagement/EditDesignation.jsx`

Line ~81

Current:

```jsx
<form onSubmit={handleSubmit}>
```

Suggestion:

```jsx
<form className="form-grid" onSubmit={handleSubmit}>
```

Reason: Without `form-grid`, this form’s inputs and select do not receive the centralized field styling.

Line ~112

Current:

```jsx
<Button type="submit">Update Designation</Button>
```

Suggestion:

```jsx
<div className="form-actions">
  <Button type="submit">Update Designation</Button>
</div>
```

Reason: Uses the shared form action alignment and responsive button layout.

`components/department/DepartmentForm.jsx`

Line ~85

Current:

```jsx
<Button type="submit">Create Department</Button>
```

Suggestion: Place the button in `div.form-actions`.

Reason: The form already uses `form-grid` and `form-group`; the action should use the matching shared form action layout.

`components/designation/DesignationForm.jsx`

Line ~108

Current:

```jsx
<Button type="submit">Create Designation</Button>
```

Suggestion: Place the button in `div.form-actions`.

Reason: Completes the existing shared form structure.

`pages/manager/ManagerDepartment.jsx`

Lines ~72, ~82, and ~92

Current:

```jsx
<div>
  <label>...</label>
  <input ... />
</div>
```

Suggestion:

```jsx
<div className="form-group">
```

Reason: These labeled controls bypass the shared form-group label spacing and typography.

`pages/manager/ManagerDashboard.jsx`

Lines ~97, ~107, ~117, and ~128

Current:

```jsx
<div>
  <label>...</label>
  <input|select|textarea ... />
</div>
```

Suggestion:

```jsx
<div className="form-group">
```

Reason: The form uses `form-grid`, but its labelled fields do not use the accompanying `form-group` utility.

`pages/employee/EditAttendance.jsx`

Lines ~134, ~145, and ~156

Current:

```jsx
<div>
  <label>...</label>
  <input|textarea ... />
</div>
```

Suggestion:

```jsx
<div className="form-group">
```

Reason: Applies the shared label, field spacing, and vertical layout.

---

### Legacy utility classes not in theme

`components/department/AssignManager.jsx`

Lines ~57 and ~80

Current:

```jsx
<div className="flex flex-wrap gap-sm mt-md">
```

Suggestion:

```jsx
<div className="flex-start gap-sm">
```

Reason: `flex`, `flex-wrap`, and `mt-md` are not defined in `theme.css`. `flex-start` and `gap-sm` are the available shared layout utilities. Keep only a separate inline wrap rule if wrapping remains essential, since the theme has no wrap utility.

---

### Inline action layouts duplicating shared utilities

`pages/manager/MyEmployees.jsx`

Line ~104

Current:

```jsx
<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
```

Suggestion:

```jsx
<div className="flex-start">
```

Reason: Duplicates the shared horizontal action layout.

Apply the same replacement pattern to:

- `pages/manager/ManagerDesignation.jsx`, line ~128
- `pages/manager/AttendanceApproval.jsx`, line ~100
- `components/designation/DesignationList.jsx`, line ~83
- `pages/admin/AttendanceManagement/PendingAttendance.jsx`, line ~132

For `components/department/DepartmentList.jsx` line ~99, place a child `div.flex-start` inside the table cell instead of applying flex layout directly to the `td`.

---

### Inline typography already covered by the theme

`components/department/DepartmentForm.jsx`

Lines ~40–46

Current:

```jsx
<h2>Create Department</h2>
<p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
```

Suggestion:

```jsx
<div className="form-header">
  <h2>Create Department</h2>
  <p>Add a new department to your organization.</p>
</div>
```

Reason: `form-header` already styles the heading and description. Also, `--text-secondary` is not a theme variable; the theme uses `--text-light`.

`components/designation/DesignationForm.jsx`

Lines ~61–67

Suggestion: Use the same `form-header` structure.

Reason: Same duplicate inline styling and unsupported variable.

`components/department/DepartmentList.jsx`

Lines ~29–35

Suggestion:

```jsx
<h2 className="section-title">Departments</h2>
<p className="section-description">View and manage all departments.</p>
```

Reason: Reuses shared section typography and removes the unsupported `--text-secondary` variable.

`components/designation/DesignationList.jsx`

Line ~28

Current:

```jsx
<h2>Designation List</h2>
```

Suggestion:

```jsx
<h2 className="section-title">Designation List</h2>
```

Reason: Matches shared section typography.

`pages/manager/ManagerDepartment.jsx`

Line ~118

Current:

```jsx
<h3 style={{ marginBottom: "12px" }}>
```

Suggestion:

```jsx
<h3>
```

Reason: The base `h3` rule already supplies `margin-bottom: var(--spacing-md)` (12px), making the inline style redundant.

`pages/manager/ManagerDashboard.jsx`

Lines ~149–156

Current:

```jsx
<h2 style={{ marginBottom: "10px" }}>Quick Actions</h2>
<p style={{ color: "var(--text-light)", marginBottom: "20px" }}>
```

Suggestion:

```jsx
<h2 className="section-title">Quick Actions</h2>
<p className="section-description">
```

Reason: The shared typography classes replace the duplicated inline presentation.

`pages/admin/AttendanceManagement/AdminAttendanceMgmt.jsx`

Line ~132

Current:

```jsx
<input type="date" ... />
```

Suggestion:

```jsx
<input className="input" type="date" ... />
```

Reason: It sits in a `filter-bar`, but only `select` fields are styled there. `input` supplies the shared field treatment.