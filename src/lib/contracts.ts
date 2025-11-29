export const CONTRACTS = {
    liskSepolia: {
        IDRX: "0x28f0F02F9fAfbeF37A5121a7094da782684ebCCF",
        USDC: "0x5ae43Eb094103fbA86205037863F3E2a8585e8da",
        PositionManager: "0x647e5bD501004ebBAc4E7b8ADe6528B20B1d1d49",
        IDRXRouter: "0x1f0e42f432936Ce2455969362e74705204EE2B62",
    },
    sepolia: {
        USDC: "0xeAB32f16B654DF262EE4734dABC1903d1FD3Df5b",
        AAPLon: "0xdaA3f05ac661255420B6B6bB2242b3e23142534E",
        VaultEth: "0x66B5C409401566f93D0854619b1FDABAc3459A38",
        ExecutorEth: "0x977E56FcBB474D335bBCe0512a6E52e88368da85",
    }
} as const;

export const ERC20_ABI = [
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_spender", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { name: "_owner", type: "address" },
            { name: "_spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        type: "function",
    },
] as const;

export const IDRX_ROUTER_ABI = [
    {
        inputs: [
            { name: "_idrxToken", type: "address" },
            { name: "_usdcToken", type: "address" },
            { name: "_ccipRouter", type: "address" },
            { name: "_destinationChainSelector", type: "uint64" }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        inputs: [
            { name: "assetId", type: "address" },
            { name: "amountIDRX", type: "uint256" },
            { name: "slippageBps", type: "uint256" }
        ],
        name: "buyStockWithIDRX",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [{ name: "_executorEth", type: "address" }],
        name: "setExecutorEth",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [{ name: "_beneficiary", type: "address" }],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            { name: "_beneficiary", type: "address" },
            { name: "_token", type: "address" }
        ],
        name: "withdrawToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "messageId", type: "bytes32" },
            { indexed: true, name: "user", type: "address" },
            { indexed: false, name: "assetId", type: "address" },
            { indexed: false, name: "amountUSDC", type: "uint256" }
        ],
        name: "BuyIntentSent",
        type: "event"
    }
] as const;

export const VAULT_ETH_ABI = [
    {
        inputs: [
            { name: "user", type: "address" },
            { name: "asset", type: "address" }
        ],
        name: "userBalances",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            { name: "user", type: "address" },
            { name: "asset", type: "address" },
            { name: "amount", type: "uint256" }
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            { name: "user", type: "address" },
            { name: "asset", type: "address" },
            { name: "amount", type: "uint256" }
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "user", type: "address" },
            { indexed: true, name: "asset", type: "address" },
            { indexed: false, name: "amount", type: "uint256" }
        ],
        name: "Deposit",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "user", type: "address" },
            { indexed: true, name: "asset", type: "address" },
            { indexed: false, name: "amount", type: "uint256" }
        ],
        name: "Withdrawal",
        type: "event"
    }
] as const;

export const EXECUTOR_ETH_ABI = [
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "user", type: "address" },
            { indexed: true, name: "asset", type: "address" },
            { indexed: false, name: "amountAAPLon", type: "uint256" }
        ],
        name: "BuyExecuted",
        type: "event"
    }
] as const;
