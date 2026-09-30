import { BsMoonStars, BsSun } from "react-icons/bs";
import { useTheme } from "../../hooks/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-surface flex items-center justify-between px-4 py-3 font-[Anton] shadow-[0px_10px_30px_rgba(15,23,42,0.05)]">
      <h1 className="text-primary text-3xl font-bold tracking-wider uppercase">
        MySticker
      </h1>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={
          theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"
        }
        title={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
        className="text-primary hover:bg-surface-container focus-visible:ring-primary rounded-full p-3 transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        {theme === "light" ? <BsMoonStars size={22} /> : <BsSun size={22} />}
      </button>
    </header>
  );
};

export default Header;
