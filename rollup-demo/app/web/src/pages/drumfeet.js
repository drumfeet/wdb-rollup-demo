import SDK from "weavedb-client"

export default function Home() {
  const start = async () => {
    try {
      const db = new SDK({
        rpc: "https://30a8a715-78fc-41d4-bfa3-4f4152812484.raas.weavedb-node.xyz:443",
        contractTxId: "br_Wm7k3ix1c85r16tUQNd0yNaiSrboigY5n4thU6J0",
      })

      const tx = await db.setRules([["allow()"]], "collection_name", "write")
      console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <button onClick={start}>Start</button>
    </>
  )
}
