module.exports = {
  db: {
    app: "http://localhost:3000",
    name: "drumtest1",
    rollup: true,
    plugins: {},
  },
  accounts: { evm: {}, ar: {} },
  defaultNetwork: "localhost",
  networks: {
    localhost: { url: "localhost:8080", admin: "admin" },
    offchain: {
      url: "54.251.23.216:9090",
      admin: "admin",
    },
    drumtest1: {
      url: "598ee00a-173a-4dcd-851d-4409a95c54dd.raas.weavedb-node.xyz:443",
      admin: "drumtest1",
    },
    drumtest2: {
      url: "42b4b729-9e11-49f8-a3b6-d1bd035834ee.raas.weavedb-node.xyz:443",
      admin: "drumtest2",
    },
    drumtest3: {
      url: "4e3762b6-f188-430c-9775-b46d6cff78dc.raas.weavedb-node.xyz:443",
      admin: "drumtest3",
    },
    drumtest4: {
      url: "f1f5bdff-b47b-4319-aa1a-a26854c682db.raas.weavedb-node.xyz:443",
      admin: "drumtest4",
    },
  },
}
