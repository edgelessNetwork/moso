import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "hardhat-tracer";
import "hardhat-deploy";
import "dotenv/config";
import "@nomicfoundation/hardhat-verify";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
      {
        version: "0.5.5",
      },
    ],
  },
  networks: {
    hardhat: {
      deploy: ["./deploy/hardhat/"],
    },
    edgelessTestnet: {
      deploy: ["./deploy/edgelessTestnet/"],
      url: "https://edgeless-testnet.rpc.caldera.xyz/http",
      chainId: 202,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
      verify: {
        etherscan: {
          apiUrl: "https://edgeless-testnet.explorer.caldera.xyz/",
        },
      },
    },
  },
  etherscan: {
    apiKey: {
      edgelessTestnet: "You can enter any api key here, it doesn't matter ",
    },
    customChains: [
      {
        network: "edgelessTestnet",
        chainId: 202,
        urls: {
          apiURL: "https://edgeless-testnet.explorer.caldera.xyz/api/",
          browserURL: "https://edgeless-testnet.explorer.caldera.xyz/",
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      edgelessTestnet: "0x08C6fBA53BF2Ae19DBdC330E258B510c1C148e44",
    },
    owner: {
      edgelessTestnet: "0x08C6fBA53BF2Ae19DBdC330E258B510c1C148e44",
    },
    sender: {
      edgelessTestnet: "0x08C6fBA53BF2Ae19DBdC330E258B510c1C148e44",
    },
  },
};

export default config;
