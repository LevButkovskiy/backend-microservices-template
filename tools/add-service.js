const { execSync } = require('child_process');
const { readFileSync, writeFileSync, existsSync } = require('fs');
const path = require('path');
const yaml = require('yaml');

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
if (!pkg.dependencies['@nestjs/config']) {
  pkg.dependencies['@nestjs/config'] = '^4.0.2';
}
if (!pkg.dependencies['@nestjs/microservices']) {
  pkg.dependencies['@nestjs/microservices'] = '^11.0.1';
}

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

// add semantic-release config and empty changelog
const releaseConfig = {
  extends: 'semantic-release-monorepo',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    ['@semantic-release/git', { assets: ['package.json', 'CHANGELOG.md'] }]
  ]
};
writeFileSync(path.join(serviceDir, '.releaserc.json'), JSON.stringify(releaseConfig, null, 2) + '\n');
writeFileSync(path.join(serviceDir, 'CHANGELOG.md'), '');

const dockerfile = `# syntax=docker/dockerfile:1\nARG SERVICE=${name}\nFROM node:20 AS builder\nWORKDIR /app\nCOPY package*.json ./\nCOPY packages ./packages\nRUN npm ci\nRUN npm run build -w packages/shared && npm run build -w packages/$SERVICE\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/package*.json ./\nCOPY --from=builder /app/packages ./packages\nRUN npm ci --omit=dev\nCMD [\"node\", \"packages/$SERVICE/dist/main.js\"]\n`;
writeFileSync(path.join(serviceDir, 'Dockerfile'), dockerfile);

const composePath = path.join(__dirname, '..', 'docker-compose.yml');
if (existsSync(composePath)) {
  const compose = yaml.parse(readFileSync(composePath, 'utf8'));
  compose.services = compose.services || {};
  compose.services[name] = {
    image: `your-registry/${name}:latest`,
    env_file: '.env',
  };
  writeFileSync(composePath, yaml.stringify(compose));
}

console.log(`Service ${name} created at ${serviceDir}`);

