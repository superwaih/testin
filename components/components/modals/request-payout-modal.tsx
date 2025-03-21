"use client";

import { XIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
interface PayoutModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;

  amount: string;
  bankDetails: {
    accountNumber: string;
    bankName: string;
    accountName: string;
  };
}

export const RequestPayoutModal = ({
  isOpen,
  setIsOpen,
  amount,
  bankDetails,
}: PayoutModalProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogOverlay className="z-[55] fixed inset-0 bg-black/15 backdrop-blur-md" />

      {showSuccess ? (
        <AlertDialogContent className="z-[56] modal  rounded-2xl px-3 py-4 w-[90%] max-w-[400px] space-y-4">
          <AlertDialogHeader className="flex justify-center items-center pt-3">
            <AlertDialogTitle className="border rounded-full p-4">
             <Image src="/images/emoji.png" alt="alt" width={20} height={20} />
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg pt-3 font-medium text-[#141416] ">
              Payout Request Accepted
            </AlertDialogDescription>
          </AlertDialogHeader>
          <p className="text-lg text-center text-[#242424]">
            You will be credited the sum of <span className="font-bold">₦{amount}</span> in
            two (2) business days.
          </p>
          <div className="flex justify-center items-center  ">
            <button  className=" border-[#000000] w-fit px-12 cursor-pointer border text-[#000000] rounded-[8px] py-2" onClick={() => setIsOpen(false)}>
              Go to Dashboard
            </button>
          </div>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent className="z-[56] modal  rounded-2xl px-3 py-4 w-[90%] max-w-[400px] space-y-4">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="w-full flex justify-between border-b-[2px] py-2 border-[#ECECEC] items-center text-lg">
                <span className="font-medium text-[#121212] text-lg md:text-[20px]">
                  Request Payout
                </span>
                <XIcon
                  className="cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm md:text-[14px] mt-2 text-center text-[#242424]">
              Confirm payment of <span className="font-bold">₦{amount}</span> to
              the bank details below:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="text-center text-[#000000] text-lg font-medium">
            <p>{bankDetails.accountNumber}</p>
            <p>{bankDetails.bankName}</p>
            <p>{bankDetails.accountName}</p>
          </div>
          <AlertDialogFooter className="flex  gap-4">
            <button
              className="w-full border-[#000000] cursor-pointer border text-[#000000] rounded-[8px] p-2"
              onClick={() => setIsOpen(false)}
            >
              Change Bank Details
            </button>
            <button onClick={() => setShowSuccess(true)} className="w-full border-[#000000] cursor-pointer border text-white bg-[#000000] rounded-[8px] p-2">
              Confirm Payout
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

// export const PayoutSuccessModal = ({
//   isOpen,
//   setIsOpen,
//   amount,
// }: {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
//   amount: string;
// }) => {
//   return (
//     <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//       <AlertDialogContent className="z-[56] top-[30%] rounded-2xl px-6 py-10 w-[90%] max-w-[400px] space-y-4 text-center">
//         <AlertDialogHeader>
//           <AlertDialogTitle>
//             <span className="text-3xl">🎉</span>
//           </AlertDialogTitle>
//           <AlertDialogDescription className="text-lg font-semibold">
//             Payout Request Accepted
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <p className="text-lg text-black">
//           You will be credited the sum of <strong>&#8358;{amount}</strong> in
//           two (2) business days.
//         </p>
//         <AlertDialogFooter>
//           <Button className="w-full" onClick={() => setIsOpen(false)}>
//             Go to Dashboard
//           </Button>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
