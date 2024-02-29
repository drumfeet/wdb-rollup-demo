import SDK from "weavedb-client"

export default function Home() {
  const start = async () => {
    try {
      // const db = new SDK({
      //   contractTxId: "offchain",
      //   // rpc: "http://13.250.6.80:8080",
      //   rpc: "https://13.250.6.80:9090",
      // })
      // console.log("db", db)
      // await db.init()

      const db = new SDK({ rpc: "http://13.250.6.80:9090", contractTxId: "ahmadtest" })
      // add a post
      const tx = await db.query("add:post", { body: "test" }, "posts")
      console.log("tx", tx)
    } catch (e) {
      console.log("e", e)
    }
  }
  return (
    <>
      Hello
      <button onClick={start}>Start</button>
    </>
  )
}
