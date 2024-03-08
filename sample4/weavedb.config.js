module.exports = {
  db: {
    app: "http://localhost:3000",
    name: "drumtest6",
    rollup: false,
    plugins: {},
  },
  accounts: { evm: {}, ar: {} },
  defaultNetwork: "offchain",
  networks: {
    localhost: { url: "localhost:8080", admin: "admin" },
    offchain: {
      // url: "13.250.6.80:9090",
      url: "13.229.238.124:8080",
      admin: "admin",
    },
  },
}
