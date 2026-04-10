import { CHAINS, deploymentAddresses } from '@api3/contracts';
import { dapis, getChains, api3ApiIntegrations, dapiManagementMerkleTreeData } from '@api3/dapi-management';
import * as fs from 'fs';

import getGasMetadata from '../../data/gas-metadata.json';

async function generateGHPagesData() {
  console.log('Generating gh-pages data...');

  const chainsJson = JSON.stringify(CHAINS, null, 2);
  const deploymentAddressesJson = JSON.stringify(deploymentAddresses, null, 2);
  const dapisJson = JSON.stringify(dapis, null, 2);
  const chainsStateJson = JSON.stringify(getChains(), null, 2);
  const apisData = JSON.stringify(api3ApiIntegrations.apisData, null, 2);
  const gasMetadataJson = JSON.stringify(getGasMetadata, null, 2);

  const mtHash = {
    timestamp: dapiManagementMerkleTreeData.timestamp,
    hash: dapiManagementMerkleTreeData.hash,
  }

  const mtJson = JSON.stringify(mtHash, null, 2);

  fs.mkdirSync('gh-pages-data', { recursive: true });

  fs.writeFileSync('gh-pages-data/chains.json', chainsJson);
  fs.writeFileSync('gh-pages-data/deployment-addresses.json', deploymentAddressesJson);
  fs.writeFileSync('gh-pages-data/dapis.json', dapisJson);
  fs.writeFileSync('gh-pages-data/chains-state.json', chainsStateJson);
  fs.writeFileSync('gh-pages-data/apis-data.json', apisData);
  fs.writeFileSync('gh-pages-data/management-merkle-tree.json', mtJson);
  fs.writeFileSync('gh-pages-data/gas-metadata.json', gasMetadataJson);

  console.log('gh-pages data generated successfully.');
}

generateGHPagesData().catch((error) => {
  console.error('Error generating gh pages data:', error);
  process.exit(1);
});
