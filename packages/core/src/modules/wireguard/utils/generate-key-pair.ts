import { execSync } from 'node:child_process';

export const generateKeyPair = () => {
  const privateKey = execSync('wg genkey', {
    encoding: 'utf-8',
  });
  const publicKey = execSync(`echo "${privateKey}" | wg pubkey`, {
    encoding: 'utf-8',
  });
  return {
    privateKey: privateKey.trim(),
    publicKey: publicKey.trim(),
  };
};
