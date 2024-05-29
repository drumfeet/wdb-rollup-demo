import SDK from "weavedb-sdk"

export default function Home() {
  const CONTRACT_TX_ID = "cxcIF4N8SEyt7PnUgMssZ-HZVNv_LY-iOGgolmRIfQ0"
  const COLLECTION_NAME = "posts"

  const start = async () => {
    const db = new SDK({ contractTxId: CONTRACT_TX_ID })
    await db.init()

    const txGet = await db.get(COLLECTION_NAME)
    console.log(txGet)
  }

  const getPosts = async () => {
    const db = new SDK({
      contractTxId: CONTRACT_TX_ID,
      remoteStateSyncEnabled: true,
      remoteStateSyncSource: "https://dre-1.warp.cc/contract",
    })
    await db.init()

    const txGet = await db.get(COLLECTION_NAME)
    console.log(txGet)
  }

  const cynanDemo = async () => {
    const db = new SDK({
      contractTxId: "5_KIAVYCJeJj9d-fAJmCcNsPlMefjfoo4PUgk1JbLTA",
      remoteStateSyncEnabled: true,
      remoteStateSyncSource: "https://dre-1.warp.cc/contract",
    })
    await db.init()

    const txGet = await db.get("D2-data", "02c076a88810958a83429111005da12c")
    console.log(txGet)
  }

  const addPost = async () => {
    const db = new SDK({ contractTxId: CONTRACT_TX_ID })
    await db.init()

    const txAdd = await db.add(
      { title: "sample", address: db.signer() },
      COLLECTION_NAME,
      userAddress
    )
    console.log(txAdd)
  }
  return (
    <>
      <button onClick={start}>Start</button>
      <br />
      <br />
      <button onClick={addPost}>Add</button>
      <br />
      <br />
      <button onClick={getPosts}>Get</button>
      <br />
      <br />
      <button onClick={cynanDemo}>cynanDemo</button>
    </>
  )
}
