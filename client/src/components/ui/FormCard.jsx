import Card from "./Card";

const FormCard = ({ title, subtitle, children }) => {
  return (
    <Card className="form-card">
      <div className="form-header">
        <h2>{title}</h2>

        {subtitle && <p>{subtitle}</p>}
      </div>

      {children}
    </Card>
  );
};

export default FormCard;
