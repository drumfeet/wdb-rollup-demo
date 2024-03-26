const SDK = require("weavedb-node-client")

const main = async () => {
  db = new SDK({
    contractTxId: "drumtest1#log",
    rpc: "localhost:8080",
  })

  const tx = await db.cget("txs", ["id", "desc"], 1000)
  console.log(tx)

  const tx2 = await db.cget("txs", ["id", "==", 9])
  console.log(tx2)

  //fetching a single documents referencing a docID does not work
  const tx3 = await db.cget("txs", "36e2583f30157f78c62b7669b4280713")
  console.log(tx3)
}

main()
