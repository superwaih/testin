"use client";

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { XIcon } from "lucide-react";

interface PayoutHistoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const payoutHistory = [
  { amount: "₦275,267.50", date: "Feb 24, 2025" },
  { amount: "₦275,267.50", date: "Feb 24, 2025" },
  { amount: "₦275,267.50", date: "Feb 24, 2025" },
  { amount: "₦275,267.50", date: "Feb 24, 2025" },
  { amount: "₦275,267.50", date: "Feb 24, 2025" },
];

export const PayoutHistoryModal = ({ isOpen, setIsOpen }: PayoutHistoryModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogOverlay className="z-[55] fixed inset-0 bg-black/15 backdrop-blur-md" />

      <AlertDialogContent className="z-[56]   modal  px-6 py-4 w-[90%] max-w-[480px] space-y-2">
        <AlertDialogHeader className="flex justify-between flex-row w-full border-b py-3">
          <AlertDialogTitle className="text-lg md:text-[20px] text-[#121212] font-medium">Payment History</AlertDialogTitle>
          <XIcon className="cursor-pointer" onClick={() => setIsOpen(false)} />
        </AlertDialogHeader>

        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 py-1 text-sm font-medium text-[#484647]  border-b">
            <span>Amount</span>
            <span>Date</span>
          </div>
          <div className="mt-2  space-y-3">
            {payoutHistory.map((item, index) => (
              <div key={index} className="grid-cols-2 sm:grid-cols-3 grid  border-b border-[#F0F3F6] py-2 text-sm text-black">
                <span className="text-[#1C1B1C] font-medium text-sm">{item.amount}</span>
                <span className="text-[#1C1B1C] font-normal text-sm">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
