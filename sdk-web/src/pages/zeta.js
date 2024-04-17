import { useState } from "react"
import SDK from "weavedb-sdk"
export default function Home() {
  const [db, setDb] = useState()
  const COLLECTION_NAME = "people"
  const init = async () => {
    const _db = new SDK({
      contractTxId: "tbg8t02nuUl_KahdVcOd6lxDeFDgtEQnVIyyqR8i8Nw",
      //   nocache: false,
    })
    await _db.init()
    setDb(_db)
    console.log(_db)
  }

  const getDocs = async () => {
    const txGetDocs = await db.get(COLLECTION_NAME)
    console.log("txGetDocs", txGetDocs)
  }

  return (
    <>
      <button onClick={init}>Initialize</button>
      <br />
      <br />
      <button onClick={getDocs}>Get docs</button>
    </>
  )
}
