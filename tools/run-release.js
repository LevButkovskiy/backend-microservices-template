const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '..', 'packages');
const packages = fs.readdirSync(packagesDir).filter(name => {
  const dir = path.join(packagesDir, name);
  return fs.statSync(dir).isDirectory();
});

for (const pkg of packages) {
  console.log(`\nReleasing ${pkg}...`);
  execSync(`npm exec -w packages/${pkg} semantic-release -e semantic-release-monorepo`, { stdio: 'inherit' });
}

