"use client";
import React, { PropsWithChildren, useState } from "react";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { PayoutHistoryModal } from "../modals/payout-history-modal";
import Navbar from "./navbar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const [showPayout, setShowPayout] = useState(false);

  return (
    <main>
      <Navbar />

      <section className="dashboard-container px-4 pt-8 pb-12">
        {children}
        <div className="flex sm:hidden flex-col p-4  space-y-3 justify-center items-center  gap-3 bg-[#FFFFFF] ">
          <button
            className="cursor-pointer"
            onClick={() => setShowPayout(true)}
          >
            Payout history
          </button>
          <Button className="bg-white border-black border w-full text-[#000000]">
            <Icons.logout />
            <span>Logout</span>
          </Button>
        </div>
        <PayoutHistoryModal isOpen={showPayout} setIsOpen={setShowPayout} />
      </section>
    </main>
  );
};

export default DashboardLayout;
