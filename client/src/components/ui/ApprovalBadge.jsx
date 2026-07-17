const ApprovalBadge = ({ status }) => {
  return <span className={`approval-badge
     ${status}`}>{status}</span>;
};

export default ApprovalBadge;
