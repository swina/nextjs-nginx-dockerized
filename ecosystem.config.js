module.exports = {
  apps: [
    {
      name: "app",
      cwd: "/app",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      max_memory_restart: "900M"
    }
  ]
};