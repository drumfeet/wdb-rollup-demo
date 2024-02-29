module.exports = {
  db: {
    app: "http://localhost:30008080",
    name: "Demo Dapp3",
    rollup: false,
    plugins: {},
  },
  accounts: { evm: {}, ar: {} },
  defaultNetwork: "offchain",
  networks: {
    localhost: { url: "13.250.6.80:8080", admin: "admin" },
    offchain: { url: "13.250.6.80:9090", admin: "admin" },
  },
}
