import axios from "axios";

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

export const downloadReport = async (
  url,
  fileName
) => {
  try {
    const response = await API.get(url, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);

    const downloadUrl =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = downloadUrl;

    const disposition =
  response.headers["content-disposition"];

let downloadName = fileName;

if (disposition) {
  const match = disposition.match(/filename="?([^"]+)"?/);

  if (match) {
    downloadName = match[1];
  }
}

link.download = downloadName || "report";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(
      downloadUrl
    );
  } catch (error) {
    console.error(
      "Report download failed:",
      error
    );
  }
};