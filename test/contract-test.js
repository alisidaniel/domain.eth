const { expect } = require("chai");
const { ethers } = require("hardhat");
const {BigNumber} = require('ethers')


const matic = 100000000000000000;
const name = 'clubhouse';
const record = 'powerhorse';

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

    it("Should return domain names and record name ", async function () {
        await contract.setRecord(name, record);

         expect(await contract.getRecord(name)).to.be.eqls(record);

         expect(await contract.getAllNames()).to.have.lengthOf(0);
    })

    it("Should register domain", async function(){
        const txn = await contract.register(name, {value: hre.ethers.utils.parseEther('1234')});
        await txn.wait();
        expect(txn.value.toString()).to.be.eqls(hre.ethers.utils.parseEther('1234').toString());
    })
})

