import SDK from "weavedb-sdk"

export default function Home() {
  const start = async () => {
    try {
      const db = new SDK({
        contractTxId: "5_KIAVYCJeJj9d-fAJmCcNsPlMefjfoo4PUgk1JbLTA",
        remoteStateSyncEnabled: true,
        remoteStateSyncSource: "https://dre-1.warp.cc/contract",
      })
      await db.init()

      const txGet = await db.get("D2-data", "02c076a88810958a83429111005da12c")
      console.log(txGet)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <button onClick={start}>Start</button>
    </>
  )
}
