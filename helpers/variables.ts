import { NetworkConfigInfo } from "./types"

export const DEVELOPMENT_CHAINS = ["hardhat", "localhost"] as const
export const TEST_CHAINS = ["rinkeby"] as const

export const NETWORK_CONFIG: NetworkConfigInfo = {
  localhost: {},
  hardhat: {},
  rinkeby: {
    blockConfirmations: 6,
  },
}
