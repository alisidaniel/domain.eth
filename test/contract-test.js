const { expect } = require("chai");
const { ethers } = require("hardhat");
const {BigNumber} = require('ethers')


const matic = 100000000000000000;

describe("Contract deployment", async function() {
    let contract;
    let domainContract;
    let owner;
    let superCoder;
    before(async function() {
        [owner, superCoder] = await hre.ethers.getSigners();
        domainContract = await ethers.getContractFactory("Domains");
        contract = await domainContract.deploy("org");
        await contract.deployed();
    })

    it("Should check owner address is equals", async function () {
        expect(await contract.owner()).to.equals(owner.address); 
    });

    it("Should return int value for calculated domain price", async function(){
        
        const res = await contract.price('google');

        expect(res.toString()).to.be.eqls(matic.toString())
    })

    it("Should not return error for setRecord", async function () {
         expect(await contract.setRecord('starclubs', 'http/')).not.be.reverted
    })
})

