const { expect } = require("chai")
const {
  path,
  is,
  assoc,
  compose,
  pickAll,
  pluck,
  equals,
  init,
  concat,
  without,
  addIndex,
  range,
  splitAt,
  tail,
  indexOf,
  last,
  splitWhen,
  lt,
  objOf,
  flatten,
  zip,
  median,
  prop,
  isNil,
  map,
} = require("ramda")

describe("WeaveDB", () => {
  it("splits node values in half", async () => {
    try {
      const TX_COUNT = 300000
      const _split = async (node, stats) => {
        let nodes = splitAt(Math.ceil(node.vals.length / 2))(node.vals)
        node.vals = node.leaf ? nodes[0] : init(nodes[0])
        let new_node = {
          leaf: node.leaf,
          // id: await this.id(stats),
          vals: nodes[1],
          prev: node.id,
          next: node.next ?? null,
        }
        if (!isNil(node.next)) {
          let next = await this.get(node.next, stats)
          next.prev = new_node.id
          await this.putNode(next, stats)
        }
      }

      const addPost1 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost2 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost3 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost4 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost5 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost6 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost7 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost8 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost9 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost10 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost11 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost12 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost13 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost14 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost15 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost16 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost17 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost18 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost19 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }
      const addPost20 = async () => {
        const node = {
          id: 1,
          vals: [1, 2, 3, 4],
          leaf: true,
        }
        const stats = {}
        for (let i = 0; i < TX_COUNT; i++) {
          await _split(node, stats)
        }
      }

      const result = await Promise.allSettled([
        addPost1(),
        addPost2(),
        addPost3(),
        addPost4(),
        addPost5(),
        addPost6(),
        addPost7(),
        addPost8(),
        addPost9(),
        addPost10(),
        addPost11(),
        addPost12(),
        addPost13(),
        addPost14(),
        addPost15(),
        addPost16(),
        addPost17(),
        addPost18(),
        addPost19(),
        addPost20(),
      ])
      console.log("result", result)
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
})
