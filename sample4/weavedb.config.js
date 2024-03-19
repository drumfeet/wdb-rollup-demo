module.exports = {
  db: {
    app: "http://localhost:3000",
    name: "drumtest2",
    rollup: false,
    plugins: {},
  },
  accounts: { evm: {}, ar: {} },
  defaultNetwork: "offchain",
  networks: {
    localhost: { url: "localhost:8080", admin: "admin" },
    offchain: {
      // url: "54.151.193.188:8080",
      url: "54.169.175.37:8080",
      admin: "admin",
    },
  },
}
