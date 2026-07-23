const Section = ({ title, description, children }) => {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>

      {description && <p className="section-description">{description}</p>}

      {children}
    </section>
  );
};

export default Section;
