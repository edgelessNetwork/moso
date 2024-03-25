import { expect } from "chai"
import { ethers } from "hardhat"
import { TestERC20, TokenDistributor } from "typechain-types"
import TokenDistrbutorJSON from "../artifacts/contracts/TokenDistributor.sol/TokenDistributor.json"

describe("BasicERC20", () => {
	let TestERC20: TestERC20
	let TokenDistributor: TokenDistributor
	let owner: any
	let sender: any

	before(async () => {
		;[owner, sender] = await ethers.getSigners()
		const TestERC20Factory = await ethers.getContractFactory("TestERC20")
		TestERC20 = await TestERC20Factory.deploy("ProtoToken", "PT")

		const TokenDistributorFactory = await ethers.getContractFactory("TokenDistributor")
		const TokenDistributorImpl = await TokenDistributorFactory.deploy()
		const TokenDistributorInterface = new ethers.Interface(TokenDistrbutorJSON.abi)
		const tokenDistributorData = TokenDistributorInterface.encodeFunctionData("initialize", [
			await TestERC20.getAddress(),
			owner.address,
			sender.address,
		])
		const ProxyFactory = await ethers.getContractFactory("ERC1967Proxy")
		const proxy = await ProxyFactory.deploy(await TokenDistributorImpl.getAddress(), tokenDistributorData)

		TokenDistributor = TokenDistributorFactory.attach(await proxy.getAddress()) as TokenDistributor
	})

	it("Send tokens to distributor", async () => {
		await TestERC20.mint(await TokenDistributor.getAddress(), 50 * 1000)
	})

	it("Batch Send tokens from distributor", async () => {
		const randomAddresses = Array.from({ length: 50 }, () => ethers.Wallet.createRandom().address)
		const randomBalances = Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000))
		await TokenDistributor.connect(sender).batchSend(randomAddresses, randomBalances)
		for (let i = 0; i < randomAddresses.length; i++) {
			const balance = await TestERC20.balanceOf(randomAddresses[i])
			expect(balance).to.equal(randomBalances[i])
		}
	})

	it("Withdraw excess tokens", async () => {
		const remainingBal = await TestERC20.balanceOf(await TokenDistributor.getAddress())
		await TokenDistributor.connect(owner).withdraw(await TestERC20.getAddress(), owner.address, remainingBal)
		expect(await TestERC20.balanceOf(await TokenDistributor.getAddress())).to.equal(0)
		expect(await TestERC20.balanceOf(owner.address)).to.equal(remainingBal)
	})
})
