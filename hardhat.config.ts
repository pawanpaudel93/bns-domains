import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers"
import "dotenv/config"

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  networks: {
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [process.env.PRIVATE_KEY!],
      saveDeployments: true,
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_KEY!,
    },
  }
};

export default config;
