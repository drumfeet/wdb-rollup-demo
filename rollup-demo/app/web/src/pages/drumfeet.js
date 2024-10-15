import SDK from "weavedb-client"

export default function Home() {
  const COLLECTION_NAME = "posts"
  const CONTRACT_TX_ID = "fFVsNa6C1YUPD5SScgXWRbuYuAuqFPMt3JvAKLn_D58"
  const RPC_URL = "http://localhost:8080"

  const start = async () => {
    try {
      const db = new SDK({
        rpc: RPC_URL,
        contractTxId: CONTRACT_TX_ID,
      })

      const tx = await db.setRules([["allow()"]], COLLECTION_NAME, "write")
      console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }

  const addDoc = async () => {
    try {
      const db = new SDK({
        rpc: RPC_URL,
        contractTxId: CONTRACT_TX_ID,
      })
      const txAdd = await db.add({ name: "Bob" }, COLLECTION_NAME, {
        privateKey:
          "YOUR_PRIVATEKEY_HERE",
      })
      console.log("txAdd", txAdd)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <button onClick={start}>Start</button>
      <br />
      <br />
      <button onClick={addDoc}>Add Doc</button>
    </>
  )
}
