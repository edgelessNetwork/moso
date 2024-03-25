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
      gasPrice: 100_000_000,
    },
    edgeless: {
      deploy: ["./deploy/edgeless/"],
      url: "https://rpc.edgeless.network/http",
      chainId: 2026,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
      verify: {
        etherscan: {
          apiUrl: "https://explorer.edgeless.network/",
        },
      },
      gasPrice: 10_000_000,
    },
  },
  etherscan: {
    apiKey: {
      edgelessTestnet: "You can enter any api key here, it doesn't matter ",
      edgeless: "You can enter any api key here, it doesn't matter"
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
      {
        network: "edgeless",
        chainId: 2026,
        urls: {
          apiURL: "https://explorer.edgeless.network/api/",
          browserURL: "https://explorer.edgeless.network/",
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      edgelessTestnet: "0xeeaB6e1e1b358118879E3e0F4687BE54b1454666",
      edgeless: "0xeeaB6e1e1b358118879E3e0F4687BE54b1454666",
    },
    owner: {
      edgelessTestnet: "0xeeaB6e1e1b358118879E3e0F4687BE54b1454666",
      edgeless: "0xeeaB6e1e1b358118879E3e0F4687BE54b1454666",
    },
    sender: {
      edgelessTestnet: "0xeeaB6e1e1b358118879E3e0F4687BE54b1454666",
      edgeless: "0xeeaB6e1e1b358118879E3e0F4687BE54b1454666",
    },
  },
};

export default config;
