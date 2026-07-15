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

    link.download = fileName;

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