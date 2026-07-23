import Card from "./Card";

const InfoCard = ({ title, value }) => {
  return (
    <Card className="info-card">
      <p className="info-title">{title}</p>

      <h3 className="info-value">{value}</h3>
    </Card>
  );
};

export default InfoCard;
