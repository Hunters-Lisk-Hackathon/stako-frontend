import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { liskSepolia, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Stako',
    projectId: 'YOUR_PROJECT_ID', // Replace with actual project ID or env var
    chains: [liskSepolia, sepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});
