import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import {
  awaitDeployForBlocks,
  unlessOnDevelopmentChainVerifyContract,
} from "../helpers/contracts/deploy"

const deployColorBox: DeployFunction = async ({
  getNamedAccounts,
  deployments: { deploy },
  network: { name: networkName },
}: HardhatRuntimeEnvironment) => {
  const { deployer } = await getNamedAccounts()

  const ColorBox = await deploy("ColorBox", {
    from: deployer,
    args: ["#6038ca"],
    log: true,
    waitConfirmations: awaitDeployForBlocks(networkName),
  })

  await unlessOnDevelopmentChainVerifyContract(networkName, ColorBox.address)
}

deployColorBox.tags = ["all", "ColorBox"]
export default deployColorBox
