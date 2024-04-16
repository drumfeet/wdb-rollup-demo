const SDK = require("weavedb-node-client")

const main = async () => {
  const db = new SDK({
    rpc: "test3-1710822176.raas.weavedb-node.xyz:9090",
  })

  const stats = await db.node({ op: "stats" })
  console.log("stats", stats)
}

main()
