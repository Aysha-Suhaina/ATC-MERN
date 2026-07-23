const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="page-header">
      <div className="page-header-row">
        <h1 className="page-title">{title}</h1>

        {children && (
          <div className="page-header-actions">
            {children}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="section-description">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
