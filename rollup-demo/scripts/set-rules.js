const WeaveDB = require("weavedb-node-client")

const db = new WeaveDB({
  // rpc: "0d93e96f-8fb5-4cf1-91fa-9fa5d32ff2e6.raas.weavedb-node.xyz:443",
  rpc: "localhost:8080",
  // contractTxId: "IteK7XLLrqsWkRdT73WCmH4_G_C7ybq6962j7ovbyHk",
  contractTxId: "NinDlDlXvdHfJM2ZCaqsIJoMJy6JQ6iSZZkThRxSrM4"
})

const main = async () => {
  try {
    const tx = await db.setRules([["allow()"]], "posts", "write", {
      privateKey:
        "YOUR_PRIVATEKEY_HERE",
    })
    console.log("tx", tx)
  } catch (e) {
    console.log(e)
  }
}
main()
