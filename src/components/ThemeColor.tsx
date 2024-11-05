import { ConfigProvider, theme as antTheme } from "antd";
import { ReactNode } from "react";
import { darkTheme, lightTheme } from "../styles/theme";
import useThemeStore from "../stores/themeStore";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDarkMode } = useThemeStore();
  const { defaultAlgorithm, darkAlgorithm } = antTheme;

  return (
    <ConfigProvider
      theme={{
        ...(isDarkMode ? darkTheme : lightTheme),
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
