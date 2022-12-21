import classes from "./notification.module.css";

function Notification({ message = "", status }) {
  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={cssClasses} style={{ transform: `translateY(${message ? 0 : "-100%"})` }}>
      <span>{message}</span>
    </div>
  );
}

export default Notification;
