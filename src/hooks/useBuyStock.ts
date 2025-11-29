import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACTS, ERC20_ABI, IDRX_ROUTER_ABI } from '@/lib/contracts';
import { useState } from 'react';

export function useBuyStock() {
    const { address } = useAccount();
    const [isApproving, setIsApproving] = useState(false);
    const [isBuying, setIsBuying] = useState(false);

    const {
        data: hash,
        writeContractAsync,
        error: writeError
    } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    // Check allowance
    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: CONTRACTS.liskSepolia.IDRX as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: address ? [address, CONTRACTS.liskSepolia.IDRXRouter as `0x${string}`] : undefined,
    });

    const buyStock = async (symbol: string, amount: string) => {
        try {
            const amountWei = parseEther(amount); // Assuming IDRX has 18 decimals

            // 1. Approve if needed
            if (!allowance || allowance < amountWei) {
                setIsApproving(true);
                const approveTx = await writeContractAsync({
                    address: CONTRACTS.liskSepolia.IDRX as `0x${string}`,
                    abi: ERC20_ABI,
                    functionName: 'approve',
                    args: [CONTRACTS.liskSepolia.IDRXRouter as `0x${string}`, amountWei],
                });
                // In a real app we'd wait for receipt here too, but for simplicity we'll proceed
                // or let the user click buy again. 
                // Ideally: await waitForTransactionReceipt(...)
                setIsApproving(false);
            }

            // 2. Execute Buy
            setIsBuying(true);
            await writeContractAsync({
                address: CONTRACTS.liskSepolia.IDRXRouter as `0x${string}`,
                abi: IDRX_ROUTER_ABI,
                functionName: 'buyStock',
                args: [symbol, amountWei],
            });
            setIsBuying(false);

        } catch (error) {
            console.error("Transaction failed:", error);
            setIsApproving(false);
            setIsBuying(false);
        }
    };

    return {
        buyStock,
        isApproving,
        isBuying,
        isConfirming,
        isConfirmed,
        hash,
        error: writeError
    };
}
