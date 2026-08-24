import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const apps = [
  ['customer-app', ''],
  ['shop-app', 'shop'],
  ['delivery-app', 'delivery'],
  ['admin-panel', 'admin'],
];

for (const [app] of apps) {
  execSync(`npm install --prefix ${app} --no-audit --no-fund`, { cwd: root, stdio: 'inherit' });
  execSync(`npm run build --prefix ${app}`, { cwd: root, stdio: 'inherit' });
}

const output = resolve(root, 'dist');
if (existsSync(output)) rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const [app, outputPath] of apps) {
  const destination = resolve(output, outputPath);
  mkdirSync(destination, { recursive: true });
  cpSync(resolve(root, app, 'dist'), destination, { recursive: true });
}

console.log('Built customer, shop, delivery, and admin apps into one deployment.');
