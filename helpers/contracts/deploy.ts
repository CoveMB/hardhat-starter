import { run } from "hardhat"
import console from "console"
import { DEVELOPMENT_CHAINS, NETWORK_CONFIG } from "../variables"

const verifyContractWith =
  (verifierTaskName: "etherscan-verify" | "sourcify") => async (contractAddress: string) => {
    try {
      await run(verifierTaskName, {
        address: contractAddress,
      })
    } catch (error) {
      console.error(
        `Error running ${verifierTaskName}`,
        (error as Error).message,
        JSON.stringify(error, undefined, 2)
      )
    }
  }

const verifyContractOnSourcify = verifyContractWith("sourcify")
const verifyContractOnEtherscan = verifyContractWith("etherscan-verify")

export const verifyContract = async (contractAddress: string) => {
  await verifyContractOnSourcify(contractAddress)
  await verifyContractOnEtherscan(contractAddress)
}

export const unlessOnDevelopmentChainVerifyContract = async (
  currentNetwork: string,
  contractAddress: string
) => {
  if (DEVELOPMENT_CHAINS.includes(currentNetwork as any)) return
  else return await verifyContract(contractAddress)
}

export const ifOnDevelopmentChainDo = async (
  currentNetwork: string,
  functionToDo: () => void | Promise<void>
) => {
  if (DEVELOPMENT_CHAINS.includes(currentNetwork as any)) await functionToDo()
}

export const awaitDeployForBlocks = (networkName: string) =>
  NETWORK_CONFIG[networkName]?.blockConfirmations || 1
