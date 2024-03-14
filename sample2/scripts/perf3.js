const {
    performance,
    PerformanceObserver,
    createHistogram,
  } = require("perf_hooks")
  const SDK = require("weavedb-node-client")
  const accounts = require("./lib/accounts")
  const { nanoid } = require("nanoid")
  
  // const performanceObserver = new PerformanceObserver((items) => {
  //   items.getEntries().forEach((entry) => {
  //     console.log(entry)
  //   })
  // })
  // performanceObserver.observe({
  //   entryTypes: ["measure", "function"],
  //   buffer: false,
  // }) // observe user timings as well as function timings
  
  const measureWritePerformance = async () => {
    const NUM_DEMO = 16
    const COLLECTION_NAME = "posts"
    const userAuth = { privateKey: accounts.evm.user.privateKey }
  
    const db = new SDK({
      rpc: "localhost:8080",
      contractTxId: "K6zxVKEuOeeZGhvfcE1q9SVxH7lkOJ4eqGuN9UWL-ZA",
    })
  
    // performance.mark('method-start')
    if (1) {
      // let start = performance.now()
  
      // for (let i = 0; i < numWrites; i++) {
  
      const randomStr = nanoid(8)
      try {
        const tx = await db.query(
          "add:post",
          { body: `Post ${NUM_DEMO} ${randomStr}` },
          COLLECTION_NAME,
          userAuth
        )
        console.log("tx.docID", tx.docID)
      } catch (e) {
        console.error(e.message)
      }
      // }
      // let end = performance.now()
      // let duration = end - start
      // console.log(`Total time for ${numWrites} writes: ${duration}ms`)
      // console.log(`Writes per second: ${numWrites / (duration / 1000)}`)
    }
    // performance.mark('method-end')
    // performance.measure('method', 'method-start', 'method-end')
    // console.log(performance.getEntriesByName('method'))
  }
  
  const sample = async () => {
    // console.log("sample")
    // const tx = await performance.timerify(measureWritePerformance)(1)
    // console.log(performance.getEntriesByName("method"))
    // console.log("tx", tx)
  
    const histogram = createHistogram()
    for (let i = 0; i < 100; i++) {
      await performance.timerify(measureWritePerformance)()
    }
  
    console.log("drumfeet", histogram)
  }
  
  sample()
  
  // measureWritePerformance(1)
  