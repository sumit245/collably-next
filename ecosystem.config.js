module.exports = {
  apps : [{
    name: "collably",
    script: "npm",
    args: "start",
    cwd: "src/app",
    watch: true,
    env: {
      NODE_ENV: "production",
    }
  }]
};
