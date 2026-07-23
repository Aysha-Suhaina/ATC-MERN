import Card from "./Card";

const StatCard = ({
  title,
  value,
  icon,
  color = "var(--primary)",
  subtitle,
}) => {
  return (
    <Card className="stat-card">
      <div className="stat-card-top">
        <div>
          <h4 className="stat-title">{title}</h4>

          <h2 className="stat-value" style={{ color }}>
            {value}
          </h2>

          {subtitle && <p className="stat-subtitle">{subtitle}</p>}
        </div>

        <div
          className="stat-icon"
          style={{
            background: color,
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
