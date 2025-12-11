import { CHAINS, deploymentAddresses } from '@api3/contracts';
import { dapis } from '@api3/dapi-management';
import * as fs from 'fs';

async function generateGHPagesData() {
  console.log('Generating gh-pages data...');

  const chainsJson = JSON.stringify(CHAINS, null, 2);
  const deploymentAddressesJson = JSON.stringify(deploymentAddresses, null, 2);
  const dapisJson = JSON.stringify(dapis, null, 2);

  fs.mkdirSync('gh-pages-data', { recursive: true });

  fs.writeFileSync('gh-pages-data/chains.json', chainsJson);
  fs.writeFileSync('gh-pages-data/deployment-addresses.json', deploymentAddressesJson);
  fs.writeFileSync('gh-pages-data/dapis.json', dapisJson);

  console.log('gh-pages data generated successfully.');
}

generateGHPagesData().catch((error) => {
  console.error('Error generating gh pages data:', error);
  process.exit(1);
});
