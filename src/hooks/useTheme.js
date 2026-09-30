import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextValue";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      "Ops, parece que você esqueceu de envolver o provider no app",
    );
  }

  return context;
};
