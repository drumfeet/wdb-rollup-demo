const WeaveDB = require("weavedb-sdk-node")

async function main() {
  const CONTRACT_TX_ID = "K6zxVKEuOeeZGhvfcE1q9SVxH7lkOJ4eqGuN9UWL-ZA"
  const COLLECTION_NAME = "posts"

  try {
    const db = new WeaveDB({
      contractTxId: CONTRACT_TX_ID,
      type: 2,
    })
    await db.init()

    // console.log("db", db)
    // console.log(await db.getInfo())

    const result = await db.get(COLLECTION_NAME)
    console.log(result)
    console.log(`Docs length: ${result.length}`)
  } catch (error) {
    console.error("An error occurred:", error)
  } finally {
    process.exit(0)
  }
}

main()
