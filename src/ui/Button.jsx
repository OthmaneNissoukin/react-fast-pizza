import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick}) {
  const base =
    "rounded-full bg-yellow-400 font-semibold uppercase outline-none ring-offset-2 transition-colors duration-300 hover:bg-yellow-500 focus:ring focus:ring-yellow-400 disabled:cursor-not-allowed disabled:hover:bg-yellow-400 inline-block disabled:opacity-50";

  const styles = {
    primary: base + " px-6 py-3 sm:px-10 sm:py-4",
    small: base + " px-4 py-2 sm:px-8 sm:py-3",
    secondary:
      "rounded-full border-2 tracking-wide hover:text-stone-300 border-stone-400 font-semibold uppercase outline-none ring-offset-2 transition-colors duration-300 hover:bg-stone-700 focus:ring focus:ring-stone-400 disabled:cursor-not-allowed disabled:hover:bg-stone-300 inline-block px-4 py-2 sm:px-8 sm:py-3",
    control: base + " px-3.5 py-2 sm:px-4 sm:py-2.5 font-semibold text-sm"
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button className={styles[type]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
