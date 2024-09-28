module.exports = {
  apps: [
    {
      name: "dev_eazybill",
      port: "4001",
      exec_mode: "cluster",
      instances: "max",
      script: "node app.js",    
    }
  ]
}
