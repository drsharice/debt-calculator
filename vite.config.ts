import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ghPages from "vite-plugin-gh-pages";

// Your GitHub username + repo name
// Example: https://github.com/YOUR_USERNAME/debt-calculator
export default defineConfig({
  plugins: [react(), ghPages()],
  base: "https://github.com/drsharice/debt-calculator",
});
