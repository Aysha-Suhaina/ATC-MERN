import { downloadReport } from "../../api/reportApi";
import Button from "../ui/Button";

export default function DownloadReports() {
  return (
    <div className="report-download-list">
      <div className="report-download-item">
        <div>
          <h3>📅 Daily Attendance</h3>

          <p>Export today's attendance records.</p>
        </div>

        <div className="report-download-actions">
          <Button
            variant="secondary"
            onClick={() =>
              downloadReport("/daily/csv")
            }
          >
            Export CSV
          </Button>

          <Button
            onClick={() =>
              downloadReport("/daily/excel")
            }
          >
            Export Excel
          </Button>
        </div>
      </div>

      <div className="report-download-item">
        <div>
          <h3>📈 Weekly Attendance</h3>

          <p>Export attendance from the last 7 days.</p>
        </div>

        <div className="report-download-actions">
          <Button
            variant="secondary"
            onClick={() =>
              downloadReport("/weekly/csv")
            }
          >
            Export CSV
          </Button>

          <Button
            onClick={() =>
              downloadReport("/weekly/excel")
            }
          >
            Export Excel
          </Button>
        </div>
      </div>

      <div className="report-download-item">
        <div>
          <h3>📊 Monthly Attendance</h3>

          <p>Export attendance for the current month.</p>
        </div>

        <div className="report-download-actions">
          <Button
            variant="secondary"
            onClick={() =>
              downloadReport("/monthly/csv")
            }
          >
            Export CSV
          </Button>

          <Button
            onClick={() =>
              downloadReport("/monthly/excel")
            }
          >
            Export Excel
          </Button>
        </div>
      </div>
    </div>
  );
}