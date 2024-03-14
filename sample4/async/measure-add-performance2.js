const { performance } = require("perf_hooks")
const SDK = require("weavedb-node-client")
const crypto = require("crypto")
const user1 = require("../.weavedb/accounts/evm/user1.json")
const user2 = require("../.weavedb/accounts/evm/user2.json")
const user3 = require("../.weavedb/accounts/evm/user3.json")
const user4 = require("../.weavedb/accounts/evm/user4.json")
const user5 = require("../.weavedb/accounts/evm/user5.json")
const user6 = require("../.weavedb/accounts/evm/user6.json")
const user7 = require("../.weavedb/accounts/evm/user7.json")
const user8 = require("../.weavedb/accounts/evm/user8.json")
const user9 = require("../.weavedb/accounts/evm/user9.json")
const user10 = require("../.weavedb/accounts/evm/user10.json")
const user11 = require("../.weavedb/accounts/evm/user11.json")
const user12 = require("../.weavedb/accounts/evm/user12.json")
const user13 = require("../.weavedb/accounts/evm/user13.json")
const user14 = require("../.weavedb/accounts/evm/user14.json")
const user15 = require("../.weavedb/accounts/evm/user15.json")
const user16 = require("../.weavedb/accounts/evm/user16.json")
const user17 = require("../.weavedb/accounts/evm/user17.json")
const user18 = require("../.weavedb/accounts/evm/user18.json")
const user19 = require("../.weavedb/accounts/evm/user19.json")
const user20 = require("../.weavedb/accounts/evm/user20.json")

const COLLECTION_NAME = process.argv[2] || "posts"
const CONTRACT_TX_ID = process.argv[3] || "drumtest1"
const RPC_NODE = process.argv[4] || "13.212.91.15:8080"

const db = new SDK({
  rpc: RPC_NODE,
  contractTxId: CONTRACT_TX_ID,
})

async function runQuery1() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user1
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery2() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user2
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery3() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user3
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery4() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user4
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery5() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user5
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery6() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user6
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery7() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user7
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery8() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user8
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery9() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user9
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery10() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user10
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery11() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user11
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery12() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user12
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery13() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user13
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery14() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user14
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery15() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user15
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery16() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user16
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery17() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user17
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery18() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user18
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery19() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user19
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function runQuery20() {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const start = performance.now()
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    user20
  )
  const end = performance.now()
  const duration = end - start
  console.log("tx.docID", tx.docID)
  return duration
}

async function fetchAllData() {
  try {
    const results = await Promise.all([
      runQuery1(),
      runQuery2(),
      runQuery3(),
      runQuery4(),
      runQuery5(),
      runQuery6(),
      runQuery7(),
      runQuery8(),
      runQuery9(),
      runQuery10(),
      runQuery11(),
      runQuery12(),
      runQuery13(),
      runQuery14(),
      runQuery15(),
      runQuery16(),
      runQuery17(),
      runQuery18(),
      runQuery19(),
      runQuery20(),
    ])
    console.log(results)

    const totalDuration = results.reduce((acc, curr) => acc + curr, 0)
    const COUNT = 20
    const averageLatency = totalDuration / COUNT
    console.log(`Average latency: ${averageLatency} milliseconds.`)
    console.log(`TPS ${COUNT / (totalDuration / 1000)}`)
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
fetchAllData()
