const crypto = require("crypto")
const SDK = require("weavedb-sdk-node")
const EthCrypto = require("eth-crypto")
const { db } = require("../sample2/weavedb.config")

const main = async () => {
  try {
    const CONTRACT_TX_ID = "NA9rKscXy1byKA7oyVypcpLgokH8qYX7Mvbu4ei6g4U"

    const sdkNode = new SDK({
      type: 3,
      contractTxId: CONTRACT_TX_ID,
    })
    await sdkNode.init()

    const dbInfo = await sdkNode.getInfo()
    console.log("dbInfo", dbInfo)
  } catch (e) {
    console.log("e", e)
  }
  process.exit()
}
main()
