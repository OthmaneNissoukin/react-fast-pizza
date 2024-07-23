import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    "font-semibold text-blue-500 transition-all duration-300 hover:text-blue-700";
  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );

  return (
    <button className={className} onClick={() => navigate(-1)}>
      {children}
    </button>
  );
}

export default LinkButton;
