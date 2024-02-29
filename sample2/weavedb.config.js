module.exports = {
  db: {
    app: "http://localhost:3000",
    name: "drumtest5",
    rollup: true,
    plugins: {},
  },
  accounts: { evm: {}, ar: {} },
  defaultNetwork: "localhost",
  networks: {
    localhost: { url: "localhost:8080", admin: "admin" },
  },
}