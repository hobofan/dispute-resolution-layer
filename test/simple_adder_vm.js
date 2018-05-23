// Copyright (C) 2018 TrueBit
// See Copyright Notice in LICENSE-MIT.txt

const SimpleAdderVM = artifacts.require("./test/SimpleAdderVM.sol")
const web3 = require('web3')

contract('SimpleAdderVM', function(accounts) {
  let simpleAdderVM

  let program = [
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
    "0x0000000000000000000000000000000000000000000000000000000000000002",
    "0x0000000000000000000000000000000000000000000000000000000000000003",
    "0x0000000000000000000000000000000000000000000000000000000000000004",
    "0x0000000000000000000000000000000000000000000000000000000000000005",
    "0x0000000000000000000000000000000000000000000000000000000000000006",
    "0x0000000000000000000000000000000000000000000000000000000000000007",
    "0x0000000000000000000000000000000000000000000000000000000000000008",
    "0x0000000000000000000000000000000000000000000000000000000000000009"
  ]

  before(async () => {
    simpleAdderVM = await SimpleAdderVM.deployed()
  })

  it("should merklize state", async () => {
    assert.equal(
      "0x5b462f578537e091d2e07e7a9ce57dd98b869843ef18fbcf05a78900cbd9841b",
      await simpleAdderVM.merklizeState.call([
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003",
        "0x0000000000000000000000000000000000000000000000000000000000000004",
      ])
    )
  })

  it("should run a step", async () => {
    assert.deepEqual(
      await simpleAdderVM.runStep.call(
        ["0x00", "0x00", "0x00"],
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      ),
      [ '0x0000000000000000000000000000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      ]
    )
  })

  it("should run steps", async () => {
    assert.deepEqual(
      await simpleAdderVM.runSteps.call(program, 5),
      [ 
        [ '0x0000000000000000000000000000000000000000000000000000000000000004',
          '0x000000000000000000000000000000000000000000000000000000000000000a',
          '0x0000000000000000000000000000000000000000000000000000000000000005' 
        ],
        '0x7399a9b676993b56ca6d584f739e60fe0bc6e7b527b3196ed9ee8086cfa08599'
      ]
    )
  })
})