const { expect } = require("chai")
const SDK = require("weavedb-sdk-node")
const fs = require("fs")
const { resolve } = require("path")
require("dotenv").config({ path: resolve(__dirname, "./.env") })
const EthCrypto = require("eth-crypto")

describe("Rate Limit Error 429", function () {
  this.timeout(0)
  const COLLECTION_NAME = "posts"
  const CONTRACT_TX_ID = "cxcIF4N8SEyt7PnUgMssZ-HZVNv_LY-iOGgolmRIfQ0"

  before(async () => {
    this.bail(true)
  })

  after(async () => {
    process.exit()
  })

  it("should not have a cache folder", () => {
    const cachePath = resolve(__dirname, "../cache")
    const folderExists = fs.existsSync(cachePath) // Check if the folder exists
    expect(folderExists).to.be.false // Assert that the folder does not exist
  })

  it("should fetch latest DB contract state without rate limiting error ", async () => {
    try {
      const db = new SDK({
        contractTxId: CONTRACT_TX_ID,
        nocache: true,
      })
      await db.init()

      const txGet = await db.get(COLLECTION_NAME)
      console.log(txGet)
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
})
