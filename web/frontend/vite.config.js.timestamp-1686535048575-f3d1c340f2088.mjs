// vite.config.js
import { defineConfig } from "file:///D:/GitHub/test-app/node_modules/vite/dist/node/index.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import react from "file:///D:/GitHub/test-app/node_modules/@vitejs/plugin-react/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/GitHub/test-app/web/frontend/vite.config.js";
if (process.env.npm_lifecycle_event === "build" && !process.env.CI && !process.env.SHOPIFY_API_KEY) {
  console.warn(
    "\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n"
  );
}
var proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false
};
var host = process.env.HOST ? process.env.HOST.replace(/https?:\/\//, "") : "localhost";
var hmrConfig;
if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host,
    port: process.env.FRONTEND_PORT,
    clientPort: 443
  };
}
var vite_config_default = defineConfig({
  root: dirname(fileURLToPath(__vite_injected_original_import_meta_url)),
  plugins: [react()],
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY)
  },
  resolve: {
    preserveSymlinks: true
  },
  server: {
    host: "localhost",
    port: process.env.FRONTEND_PORT,
    hmr: hmrConfig,
    proxy: {
      "^/(\\?.*)?$": proxyOptions,
      "^/api(/|(\\?.*)?$)": proxyOptions
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHaXRIdWJcXFxcdGVzdC1hcHBcXFxcd2ViXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxHaXRIdWJcXFxcdGVzdC1hcHBcXFxcd2ViXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9HaXRIdWIvdGVzdC1hcHAvd2ViL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IGRpcm5hbWUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJ1cmxcIjtcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuaWYgKFxuICBwcm9jZXNzLmVudi5ucG1fbGlmZWN5Y2xlX2V2ZW50ID09PSBcImJ1aWxkXCIgJiZcbiAgIXByb2Nlc3MuZW52LkNJICYmXG4gICFwcm9jZXNzLmVudi5TSE9QSUZZX0FQSV9LRVlcbikge1xuICBjb25zb2xlLndhcm4oXG4gICAgXCJcXG5CdWlsZGluZyB0aGUgZnJvbnRlbmQgYXBwIHdpdGhvdXQgYW4gQVBJIGtleS4gVGhlIGZyb250ZW5kIGJ1aWxkIHdpbGwgbm90IHJ1biB3aXRob3V0IGFuIEFQSSBrZXkuIFNldCB0aGUgU0hPUElGWV9BUElfS0VZIGVudmlyb25tZW50IHZhcmlhYmxlIHdoZW4gcnVubmluZyB0aGUgYnVpbGQgY29tbWFuZC5cXG5cIlxuICApO1xufVxuXG5jb25zdCBwcm94eU9wdGlvbnMgPSB7XG4gIHRhcmdldDogYGh0dHA6Ly8xMjcuMC4wLjE6JHtwcm9jZXNzLmVudi5CQUNLRU5EX1BPUlR9YCxcbiAgY2hhbmdlT3JpZ2luOiBmYWxzZSxcbiAgc2VjdXJlOiB0cnVlLFxuICB3czogZmFsc2UsXG59O1xuXG5jb25zdCBob3N0ID0gcHJvY2Vzcy5lbnYuSE9TVFxuICA/IHByb2Nlc3MuZW52LkhPU1QucmVwbGFjZSgvaHR0cHM/OlxcL1xcLy8sIFwiXCIpXG4gIDogXCJsb2NhbGhvc3RcIjtcblxubGV0IGhtckNvbmZpZztcbmlmIChob3N0ID09PSBcImxvY2FsaG9zdFwiKSB7XG4gIGhtckNvbmZpZyA9IHtcbiAgICBwcm90b2NvbDogXCJ3c1wiLFxuICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgcG9ydDogNjQ5OTksXG4gICAgY2xpZW50UG9ydDogNjQ5OTksXG4gIH07XG59IGVsc2Uge1xuICBobXJDb25maWcgPSB7XG4gICAgcHJvdG9jb2w6IFwid3NzXCIsXG4gICAgaG9zdDogaG9zdCxcbiAgICBwb3J0OiBwcm9jZXNzLmVudi5GUk9OVEVORF9QT1JULFxuICAgIGNsaWVudFBvcnQ6IDQ0MyxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcm9vdDogZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpLFxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGRlZmluZToge1xuICAgIFwicHJvY2Vzcy5lbnYuU0hPUElGWV9BUElfS0VZXCI6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52LlNIT1BJRllfQVBJX0tFWSksXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBwcmVzZXJ2ZVN5bWxpbmtzOiB0cnVlLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcImxvY2FsaG9zdFwiLFxuICAgIHBvcnQ6IHByb2Nlc3MuZW52LkZST05URU5EX1BPUlQsXG4gICAgaG1yOiBobXJDb25maWcsXG4gICAgcHJveHk6IHtcbiAgICAgIFwiXi8oXFxcXD8uKik/JFwiOiBwcm94eU9wdGlvbnMsXG4gICAgICBcIl4vYXBpKC98KFxcXFw/LiopPyQpXCI6IHByb3h5T3B0aW9ucyxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlSLFNBQVMsb0JBQW9CO0FBQ3RULFNBQVMsZUFBZTtBQUN4QixTQUFTLHFCQUFxQjtBQUU5QixPQUFPLFdBQVc7QUFKNkosSUFBTSwyQ0FBMkM7QUFNaE8sSUFDRSxRQUFRLElBQUksd0JBQXdCLFdBQ3BDLENBQUMsUUFBUSxJQUFJLE1BQ2IsQ0FBQyxRQUFRLElBQUksaUJBQ2I7QUFDQSxVQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0sZUFBZTtBQUFBLEVBQ25CLFFBQVEsb0JBQW9CLFFBQVEsSUFBSTtBQUFBLEVBQ3hDLGNBQWM7QUFBQSxFQUNkLFFBQVE7QUFBQSxFQUNSLElBQUk7QUFDTjtBQUVBLElBQU0sT0FBTyxRQUFRLElBQUksT0FDckIsUUFBUSxJQUFJLEtBQUssUUFBUSxlQUFlLEVBQUUsSUFDMUM7QUFFSixJQUFJO0FBQ0osSUFBSSxTQUFTLGFBQWE7QUFDeEIsY0FBWTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFDRixPQUFPO0FBQ0wsY0FBWTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1Y7QUFBQSxJQUNBLE1BQU0sUUFBUSxJQUFJO0FBQUEsSUFDbEIsWUFBWTtBQUFBLEVBQ2Q7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU0sUUFBUSxjQUFjLHdDQUFlLENBQUM7QUFBQSxFQUM1QyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sK0JBQStCLEtBQUssVUFBVSxRQUFRLElBQUksZUFBZTtBQUFBLEVBQzNFO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTSxRQUFRLElBQUk7QUFBQSxJQUNsQixLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsTUFDZixzQkFBc0I7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
