const SDK = require("weavedb-sdk-node")

const main = async () => {
  const db = new SDK({
    contractTxId: "tbg8t02nuUl_KahdVcOd6lxDeFDgtEQnVIyyqR8i8Nw",
    nocache: true,
  })
  await db.init()

  COLLECTION_NAME = "people"

  const txGetDocs = await db.get(COLLECTION_NAME)
  console.log("txGetDocs", txGetDocs)

  process.exit()
}
main()
