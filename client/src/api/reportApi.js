import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: "http://localhost:4000/api/reports",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const downloadReport = async (url) => {
  try {
    const response = await API.get(url, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);

    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    // Get filename from backend
    const disposition = response.headers["content-disposition"];

    let fileName = "report";

    if (disposition) {
      const match = disposition.match(/filename="?([^"]+)"?/);

      if (match) {
        fileName = match[1];
      }
    }

    link.href = downloadUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    link.remove();

    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Report download failed:", error);

    let message = "Report download failed.";

    if (error.response?.data instanceof Blob) {
      try {
        const text = await error.response.data.text();
        const json = JSON.parse(text);
        message = json.message || message;
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError);
      }
    }

    toast.error(message);
  }
};
