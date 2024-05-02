const SDK = require("weavedb-node-client")
const SDK_NODE = require("weavedb-sdk-node")
const EthCrypto = require("eth-crypto")
const dbOwnerAuth = require("../.weavedb/accounts/evm/owner.json")

const TX_COUNT = parseInt(process.argv[2], 10) || 2
const COLLECTION_NAME = process.argv[3] || "posts"
// const CONTRACT_TX_ID = "w0ZG-xzLgd8IUMz4-TROgjnDbXf370wQKc6Lm0ko-a4"
// const CONTRACT_TX_ID = "-hRdhEsa05Ur8VEg52rFxa385-qT3sjE7i175PoAWK4"
const CONTRACT_TX_ID = "NLLZ5ULDRw7DdNBcSPzbrsrVLtxmqNzRrBsAjaVynBw"
const RPC_NODE = "localhost:9090"

const wait = (ms) => {
  console.log("waiting for...", String(ms), "ms")
  return new Promise((res) => setTimeout(() => res(), ms))
}

const createStuckNode = async () => {
  const db = new SDK({
    rpc: RPC_NODE,
    contractTxId: CONTRACT_TX_ID,
  })
  for (let i = 0; i < TX_COUNT; i++) {
    const txSetRules = await db.setRules(
      [["allow()"]],
      COLLECTION_NAME,
      "write",
      dbOwnerAuth
    )
    console.log(`[${i}] txSetRules.success ${txSetRules.success}`)
  }
}

const createStuckNodeAsync = async () => {
  try {
    const db = new SDK({
      rpc: RPC_NODE,
      contractTxId: CONTRACT_TX_ID,
    })

    // const txSetRules = await db.setRules(
    //   [["allow()"]],
    //   COLLECTION_NAME,
    //   "write",
    //   dbOwnerAuth
    // )
    // console.log("txSetRules", txSetRules)

    const addPost1 = async () => {
      const userAuth = EthCrypto.createIdentity()
      for (let i = 0; i < TX_COUNT; i++) {
        const txAddPost = await db.add(
          { address: userAuth.address },
          COLLECTION_NAME,
          userAuth
        )
      }
      return "addPost1"
    }
    const addPost2 = async () => {
      const userAuth = EthCrypto.createIdentity()
      for (let i = 0; i < TX_COUNT; i++) {
        const txAddPost = await db.add(
          { address: userAuth.address },
          COLLECTION_NAME,
          userAuth
        )
      }
      return "addPost2"
    }
    const addPost3 = async () => {
      const userAuth = EthCrypto.createIdentity()
      for (let i = 0; i < TX_COUNT; i++) {
        const txAddPost = await db.add(
          { address: userAuth.address },
          COLLECTION_NAME,
          userAuth
        )
      }
      return "addPost3"
    }
    const addPost4 = async () => {
      const userAuth = EthCrypto.createIdentity()
      for (let i = 0; i < TX_COUNT; i++) {
        const txAddPost = await db.add(
          { address: userAuth.address },
          COLLECTION_NAME,
          userAuth
        )
      }
      return "addPost4"
    }

    const results = await Promise.allSettled([
      addPost1(),
      addPost2(),
      addPost3(),
      addPost4(),
    ])
    console.log(results)
  } catch (e) {
    console.error(e)
  }
}
const queryOnStuckNode = async () => {
  try {
    const db = new SDK({
      rpc: RPC_NODE,
      contractTxId: CONTRACT_TX_ID,
    })

    // const txSetRules = await db.setRules(
    //   [["allow()"]],
    //   COLLECTION_NAME,
    //   "write",
    //   dbOwnerAuth
    // )
    // console.log("txSetRules", txSetRules)

    const userAuth = EthCrypto.createIdentity()
    const txAddPost = await db.add(
      { address: userAuth.address },
      COLLECTION_NAME,
      userAuth
    )
    console.log("txAddPost", txAddPost)
  } catch (e) {
    console.log(e)
  }
}

const fetchDoc = async () => {
  const db = new SDK_NODE({ contractTxId: CONTRACT_TX_ID, nocache: true })
  await db.init()
  const txGet = await db.get(COLLECTION_NAME)
  console.log("txGet", txGet)
}

const fetchLog = async () => {
  const db = new SDK({ contractTxId: `${CONTRACT_TX_ID}#log`, rpc: RPC_NODE })
  const txLogRes = await db.get("txs", ["id", "desc"], 1)
  console.log("txLogRes", txLogRes)
}

const getHeight = async () => {
  try {
    // const warp_db = new SDK({
    //   type: 3,
    //   contractTxId: CONTRACT_TX_ID,
    //   arweave: network,
    // })
    const warp_db = new SDK_NODE({
      contractTxId: CONTRACT_TX_ID,
      nocache: true,
      type: 3,
    })
    await warp_db.init()
    console.log(
      "getHeight",
      (await warp_db.db.readState()).cachedValue.state.rollup.height
    )
    const txGet = await warp_db.get(COLLECTION_NAME)
    console.log("txGet", txGet)
  } catch (e) {
    console.log(e)
  } finally {
    process.exit()
  }
}

// createStuckNode()
// createStuckNodeAsync()
// queryOnStuckNode()
// fetchDoc()
// fetchLog()
getHeight()
