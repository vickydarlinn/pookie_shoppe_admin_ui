// themeStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware"; // Import devtools

type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const storageKey = "pookie-shoppie-theme";

const useThemeStore = create<ThemeState>()(
  devtools(
    (set) => ({
      theme: (localStorage.getItem(storageKey) as Theme) || "system",
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        set({ theme });
        updateThemeOnDOM(theme);
      },
    }),
    { name: "ThemeStore" }
  ) // Add a name for easy identification in Redux DevTools
);

// Helper function to update the DOM when the theme changes
function updateThemeOnDOM(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}

// Initialize theme on first load
updateThemeOnDOM(useThemeStore.getState().theme);

export default useThemeStore;
