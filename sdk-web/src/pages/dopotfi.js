import SDK from "weavedb-sdk"

export default function Home() {
  const linkAddress = async () => {
    try {
      const db = new SDK({
        contractTxId: "NkYdataKkg9KYtjbopSyjqeFTfBGEa6h66zHSdB33W8",
        remoteStateSyncEnabled: true,
        remoteStateSyncSource: "https://dre-1.warp.cc/contract",
      })
      await db.init()

      const { identity } = await db.createTempAddress()
      console.log("identity", identity)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <button onClick={linkAddress}>Start</button>
    </>
  )
}
