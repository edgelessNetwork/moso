import { ethers } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import TokenDistrbutorJSON from "../../artifacts/contracts/TokenDistributor.sol/TokenDistributor.json";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, owner, sender } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  await hre.deployments.deploy("TestERC20", {
    from: deployer,
    args: ["Fake Space ID", "ID"],
    log: true,
  });

  await deploy("TokenDistributor", {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: [(await get("TestERC20")).address, owner, sender],
        },
      },
      proxyContract: "OpenZeppelinTransparentProxy",
    },
  });

  await hre.run("verify:verify", {
    address: (await get("TestERC20")).address,
    constructorArguments: ["Fake Space ID", "ID"],
  });

  const TokenDistributorInterface = new ethers.Interface(
    TokenDistrbutorJSON.abi,
  );
  const tokenDistributorData = TokenDistributorInterface.encodeFunctionData(
    "initialize",
    [(await get("TestERC20")).address, owner, sender],
  );

  await hre.run("verify:verify", {
    address: (await get("TokenDistributor")).address,
    constructorArguments: [
      (await get("TokenDistributor_Implementation")).address,
      tokenDistributorData,
    ],
  });

  await hre.run("verify:verify", {
    address: (await get("TokenDistributor_Implementation")).address,
    constructorArguments: [],
  });
};
export default func;
func.tags = ["erc20"];
