export default function showToast(message, type = "info", ttl = 3000) {
  const containerId = "app-toast-container";
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    Object.assign(container.style, {
      position: "fixed",
      top: "1rem",
      right: "1rem",
      zIndex: 10500,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    });
    document.body.appendChild(container);
  }

  const bg = type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#6c757d";
  const toast = document.createElement("div");
  Object.assign(toast.style, {
    background: bg,
    color: "white",
    padding: "10px 14px",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    fontSize: "0.95rem",
    maxWidth: "320px",
  });
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 250ms, transform 250ms";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-8px)";
    setTimeout(() => container.removeChild(toast), 300);
  }, ttl);
}