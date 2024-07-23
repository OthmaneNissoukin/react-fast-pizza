import { useSelector } from "react-redux";

function Username({ className }) {
  const username = useSelector((store) => store.user.username);
  return (
    <div className={`font-semibold ${className}`}>{username || "GUEST"}</div>
  );
}

export default Username;
