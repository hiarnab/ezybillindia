module.exports = {
  apps: [
    {
      name: "codersmile",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "serve build/"
    }
  ]
}
  
