import { useEffect, useState } from "react"
import SDK from "weavedb-client"

export default function Home() {
  const start = async () => {
    try {
      // const db = new SDK({
      //   contractTxId: "JxSkQKwNPPT9Gk6tFPVTvhllbaKx7engK5Df9ITvxiM",
      //   rpc: "http://localhost:8080",
      // })
      const db = new SDK({
        rpc: "http://13.250.6.80:9090",
        contractTxId: "drumfeet9090",
      })
      console.log("db", db)

      const tx = await db.query("add:post", { body: "testweb2" }, "posts")
      console.log("tx", tx)

      const result = await db.get("posts")
      console.log("result", result)

      // const { identity } = await db.createTempAddress()
      // console.log("identity", identity)

      // const tx = await db.add(
      //   { id: "johnid", body: "johnboidy", owner: "sdfs", date: 2 },
      //   "people"
      // )
      // console.log("tx", tx)

      // const tx2 = await db.setSchema(
      //   { type: "object", required: [], properties: {} },
      //   "drumfeet"
      // )
      // console.log("tx2", tx2)

      // const tx = await db.setRules([["allow()"]], "collection_name", "write")
      // console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }

  const [rpcUrl, setRpcUrl] = useState("http://localhost:8080")
  const [db, setDb] = useState()
  const [dbName, setDbName] = useState("")
  const [ownerWalletAddress, setOwnerWalletAddress] = useState("")

  const deployDatabase = async () => {
    try {
      await db.admin(
        {
          op: "add_db",
          key: dbName, // This value will appear as `Contract TxID` in WeaveDB Scan if `rollup` to Warp is set to false
          db: {
            app: "http://localhost:3000",
            name: dbName, // Replace 'db_name' with the database name you wish to use
            rollup: true, // Set this to true to deploy your database to roll up to the Layer 1 Warp contract
            plugins: { notifications: {} },
            tick: 1000 * 60 * 5,
            owner: ownerWalletAddress,
          },
        },
        {
          // privateKey: adminWallet,
          nonce: 1,
        }
      )
      console.log(`DB [${dbName}] added!`)
    } catch (e) {
      console.log(e.message)
    }
  }

  const deployWarp = async () => {
    try {
      const { contractTxId, srcTxId } = await db.admin(
        {
          op: "deploy_contract",
          key: dbName,
          db: {
            owner: ownerWalletAddress,
          },
        }
        // {
        //   privateKey: adminAuth, // Replace 'ADMIN_PRIVATE_KEY' with the actual admin private key
        // }
      )
      if (contractTxId) {
        console.log("DB successfully deployed!")
        console.log("contractTxId", contractTxId)
      } else {
        console.log("something went wrong!")
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const connect = async () => {
    const _db = new SDK({
      rpc: rpcUrl,
      contractTxId: dbName,
    })
    setDb(_db)
    console.log("_db", _db)
    const stats = await _db.node({ op: "stats" })
    console.log("stats", stats)
  }

  useEffect(() => {}, [])

  return (
    <>
      <label>Database Name:</label>
      <input
        type="text"
        size="28"
        required
        onChange={(e) => setDbName(e.target.value.toLowerCase())}
      />
      <br />
      <br />
      <label>Database Owner Wallet Address:</label>
      <input
        type="text"
        size="28"
        required
        onChange={(e) => setOwnerWalletAddress(e.target.value)}
      />
      <br />
      <br />
      <label>RPC Node Endpoint:</label>
      <input
        type="url"
        name="url"
        id="url"
        placeholder="http://localhost:8080"
        pattern="http://.*"
        size="28"
        required
        defaultValue={rpcUrl}
        onChange={(e) => setRpcUrl(e.target.value)}
      />
      <br />
      <br />
      <button onClick={connect}>Connect</button>
      <br />
      <br />
      <button onClick={deployDatabase}>Deploy Database</button>
      <br />
      <br />
      <button onClick={deployWarp}>Deploy to Warp</button>
    </>
  )
}
