interface StatusProps {
  status?: string;
  children?: React.ReactNode;
}

export const Status = ({ status, children }: StatusProps) => {
  const color = () => {
    switch (status) {
      case "In Progress":
        return "orange";
      case "Not Started":
        return "#2c3034";
      case "Completed":
        return "green";
      default:
        return "#2c3034";
    }
  };
  return (
    <span
      style={{ backgroundColor: `${color()}` }}
      className="badge badge-pill"
    >
      {status || children}
    </span>
  );
};
