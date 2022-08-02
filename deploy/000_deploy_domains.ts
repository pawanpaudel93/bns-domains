import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployDomain: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, run } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const isDevelopmentEnvironment = network.name === 'hardhat' || network.name === 'localhost';
    const args = ["bbx"]
    const Domains = await deploy("Domains", {
        from: deployer,
        log: true,
        args,
        waitConfirmations: isDevelopmentEnvironment ? 0 : 6,
    });
    log("Contract deployed to:", Domains.address);
    log("Contract deployed by:", deployer);
    if (!isDevelopmentEnvironment) {
        log("Verifying Domains contract...");
        try {
            await run("verify:verify", {
                address: Domains.address,
                constructorArguments: args,
            })
        } catch (e) {
            log("Error verifying Domains contract:", e);
        }
    }
};
export default deployDomain;
deployDomain.tags = ['all', 'domain'];
