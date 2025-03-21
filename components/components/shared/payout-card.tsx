"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
import {
  useGetPartnerBankAccount,
  usePartnerCurrentRevenue,
} from "@/services/dashboard";
import { AddAccountModal } from "../modals/add-account-modal";
import { RequestPayoutModal } from "../modals/request-payout-modal";
import StatCard, { IStatCard } from "../stats/stat-card";

const PayoutSection = () => {
  const [showRequest, setShowRequestPayout] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const { data, error, isLoading } = useGetPartnerBankAccount();
  const [bankDetails, setBankDetails] = useState(null);
  const handlePayout = () => {
    setShowRequestPayout(true);
  };
  const { isPending, data: currentRevenue } = usePartnerCurrentRevenue();

  const handleEditBankDetails = () => {
    setBankDetails(data); // Set current bank details
    setShowAddAccountModal(true);
  };
  const stat: IStatCard = {
    title: "Available Earnings",
    isCurrency: true,
    variant: "blue",
    isLoading: isPending,
    stat: currentRevenue?.available_earnings ?? 0,
    requestPayout: true,
    disabled: currentRevenue?.available_earnings > 0 ? false : true,
    handleRequestPayout: handlePayout,
    statChange: 30,
  };
  return (
    <div className="p-2 rounded-[20px] shadow border border-[#E5E1E1]">
      <StatCard stat={stat} />
      <div className="w-full border-b border-dashed my-3"></div>
      <div className="bg-[#F5F5F5] flex flex-col space-y-2 p-4 rounded-[20px] min-h-[30vh]">
        {
          (error as any)?.response?.data?.error ? (
            <>
              <h2 className="text-[#021F4C] font-normal text-lg">
                Bank Details
              </h2>
              <p className="text-[#021F4C]">
                Add your bank details for payouts
              </p>
              <Button
                onClick={() => setShowAddAccountModal(true)}
                className="w-fit"
              >
                Add Bank Details
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h2 className="text-[#021F4C] font-normal text-lg">
                  Bank Details
                </h2>
                <div className="space-y-2">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-4 w-1/2 bg-gray-300 rounded-md" />
                      <Skeleton className="h-4 w-1/3 bg-gray-300 rounded-md" />
                      <Skeleton className="h-4 w-2/3 bg-gray-300 rounded-md" />
                    </>
                  ) : (
                    <>
                      <p className="text-[#021F4C]">{data?.account_number}</p>
                      <p className="text-[#021F4C]">{data?.bank_name}</p>
                      <p className="text-[#021F4C]">{data?.account_name}</p>
                    </>
                  )}
                </div>
                <Button onClick={handleEditBankDetails} className="w-fit">
                  Edit
                </Button>
              </div>
            </>
          )
        }
      </div>

      <AddAccountModal
        bankdetails={bankDetails}
        isOpen={showAddAccountModal}
        setIsOpen={setShowAddAccountModal}
      />
      <RequestPayoutModal
        isOpen={showRequest}
        setIsOpen={setShowRequestPayout}
        amount="50000"
        bankDetails={{
          accountNumber: "0159183765",
          bankName: "Guarranty Trust Bank",
          accountName: "Shittu Sheriff Adewale",
        }}
      />
    </div>
  );
};

export default PayoutSection;
