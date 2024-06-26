const config = require("../weavedb.config.js")
const SDK = require("weavedb-node-client")
const accounts = require("./lib/accounts")
const { isNil } = require("ramda")
let {
  _: [name],
  network,
  owner,
} = require("yargs")(process.argv.slice(2)).parserConfiguration({
  "parse-numbers": false,
}).argv

if (isNil(name)) {
  console.error(`DB name not specified`)
  process.exit()
}

if (isNil(accounts.evm[owner])) {
  console.error(`EVM owner not specified or found: ${owner} `)
  process.exit()
}

network ??= config.defaultNetwork
const rpc = config.networks[network]
let privateKey = null

if (isNil(rpc)) {
  console.error(`network not found: ${network}`)
  process.exit()
} else {
  privateKey = accounts.evm[rpc.admin]?.privateKey
  if (isNil(privateKey)) {
    console.error(`Rollup admin not specified or not found: ${rpc.admin}`)
    process.exit()
  }
}

const main = async () => {
  const db = new SDK({ rpc: rpc.url, contractTxId: name })
  try {
    await db.admin(
      {
        op: "add_db",
        key: name,
        db: { ...config.db, owner: accounts.evm[owner].address.toLowerCase() },
      },
      { privateKey }
    )
    console.log(`DB [${name}] added!`)

    if (config.db.rollup) {
      const tx = await db.admin(
        {
          op: "deploy_contract",
          key: name,
        },
        { privateKey }
      )
      if (!isNil(tx.contractTxId)) {
        console.log("DB successfully deployed!")
        console.log(tx)
      } else {
        console.log("something went wrong!")
      }
    }
  } catch (e) {
    console.log(e)
  }
  process.exit()
}

main()
