const SDK = require("weavedb-node-client")
const accounts = require("./lib/accounts")

const main = async (key) => {
  const COLLECTION_NAME = "posts"
  const userAuth = { privateKey: accounts.evm.user.privateKey }
  const db = new SDK({
    rpc: "localhost:8080",
    contractTxId: "JxSkQKwNPPT9Gk6tFPVTvhllbaKx7engK5Df9ITvxiM",
  })

  for (let i = 0; i < 20; i++) {
    console.time(`add:post ${i}`)
    const tx = await db.query("add:post", { body: `Poster ${i}` }, "posts", userAuth)
    console.timeEnd(`add:post ${i}`)

    console.time(`get:post ${i}`)
    console.log(await db.get(COLLECTION_NAME, tx.docID))
    console.timeEnd(`get:post ${i}`)
  }


  console.time(`delete:post ${i}`)
  const txDelete = await db.query("delete:post", COLLECTION_NAME, tx.docID, userAuth)
  console.log("txDelete", txDelete)
  console.timeEnd(`delete:post ${i}`)

  // console.timeEnd('addPosts');
  //   // add a post
  //   const tx = await db.query(
  //     "add:post",
  //     { body: "test1" },
  //     COLLECTION_NAME,
  //     userAuth
  //   )
  //   console.log("tx", tx)
  // get posts
  console.log(await db.get(COLLECTION_NAME))

  // const tx = await db.query("delete:post", COLLECTION_NAME, "6dc562806fc959ffad5ec7f6e7932523", userAuth)
  // console.log("tx", tx)
  // console.log(await db.get(COLLECTION_NAME))
  process.exit()
}

main()
