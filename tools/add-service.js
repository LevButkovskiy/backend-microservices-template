const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('Usage: npm run add:service -- <name>');
  process.exit(1);
}

const serviceDir = path.join(__dirname, '..', 'packages', name);

execSync(`npx -y @nestjs/cli@11 new ${name} --directory ${serviceDir} --skip-git --package-manager npm`, { stdio: 'inherit' });

const pkgPath = path.join(serviceDir, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

pkg.dependencies = pkg.dependencies || {};
if (!pkg.dependencies['@backend/shared']) {
  pkg.dependencies['@backend/shared'] = '*';
}

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`Service ${name} created at ${serviceDir}`);

