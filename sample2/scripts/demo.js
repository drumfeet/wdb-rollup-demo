const SDK = require("weavedb-node-client")
const accounts = require("./lib/accounts")

const main = async key => {
  const userAuth = { privateKey: accounts.evm.user.privateKey }
  const db = new SDK({ rpc: "localhost:8080", contractTxId: "JxSkQKwNPPT9Gk6tFPVTvhllbaKx7engK5Df9ITvxiM" })
  // add a post
//   await db.query("add:post", { body: "test2" }, "posts", userAuth)
  // get posts
  console.log(await db.get("posts"))
  // delete a post
//   await db.query("add:post", { body: "test" }, "posts", userAuth)
  process.exit()
}

main()