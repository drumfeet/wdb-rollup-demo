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

      const tx =  await db.query("add:post", { body: "testweb2" }, "posts")
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

  return (
    <>
      <button onClick={start}>Start</button>
    </>
  )
}
