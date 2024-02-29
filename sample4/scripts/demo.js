const SDK = require("weavedb-node-client")
const accounts = require("./lib/accounts")

const main = async key => {
  const userAuth = { privateKey: accounts.evm.user.privateKey }
  const db = new SDK({ rpc: "13.250.6.80:9090", contractTxId: "drumfeet9090" })
  // add a post
  await db.query("add:post", { body: "test4" }, "posts", userAuth)
  // get posts
  console.log(await db.get("posts"))
  // delete a post
  // await db.query("add:post", { body: "test" }, "posts", userAuth)
  process.exit()
}

main()