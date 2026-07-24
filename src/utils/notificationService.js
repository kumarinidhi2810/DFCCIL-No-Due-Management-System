export const addNotification = ({
  role,
  userId = "",
  departmentId = "",
  title,
  message,
  requestId = "",
  employeeName="",
}) => {
  const notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  notifications.unshift({
    id: Date.now(),
    role,
    userId,
    departmentId,
    title,
    message,
    requestId,
    employeeName,
    read: false,
    createdAt: new Date().toLocaleString(),
  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );
};