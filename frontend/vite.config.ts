import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		react(),
		{
			name: "markdown-loader",
			transform(src, id) {
				if (id.endsWith(".md")) {
					return `export default ${JSON.stringify(src)}`;
				}
			},
		},
	],
});
