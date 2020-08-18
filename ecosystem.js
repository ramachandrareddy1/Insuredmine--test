module.exports = {
  apps : [{
    script    : "index.js",
    instances : "max",
    exec_mode : "cluster",
    max_memory_restart: '100M'
  }]
}