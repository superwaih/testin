import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBalance } from "@/utils/constants";
import { ChevronUp } from "lucide-react";
import React from "react";

export interface IStatCard {
  title: string;
  isCurrency: boolean;
  variant: "blue" | "cyan" | "yellow" | "lightblue" | "ocean";
  stat: number;
  statChange: number;
  showStatPercent?: boolean;
  isLoading?: boolean;
  requestPayout?: boolean;
  disabled?: boolean;
  handleRequestPayout?: () => void;
}

const variantClasses = {
  cyan: "bg-[#EEEBFC] text-[#021F4C]",
  yellow: "bg-[#F59E0B1F] text-[#021F4C]",
  lightblue: "bg-[#E1EFFD] text-[#021F4C]",
  ocean: "bg-[#0BE5F51F] text-[#021F4C]",
  blue: "bg-[#4A62FF] text-[#FFFFFF]",
};

const StatCard = ({ stat }: { stat: IStatCard }) => {
  return (
    <div
      className={`rounded-[20px] p-4 flex flex-col space-y-2 ${
        variantClasses[stat.variant]
      }`}
    >
      <h3 className="text-lg font-medium">{stat.title}</h3>
      <div className="flex flex-col md:flex-row gap-4  w-full justify-between">
        <div className="flex gap-2 items-center">
          <p className="text-2xl  font-semibold ">
           {stat.isLoading ? 
          <Skeleton className="bg-gray-100 h-[16px] w-[60px]" /> 
          :
          <>
          <span>

           {stat.isCurrency ? "₦" : ""}
            {stat.isCurrency ? 
            
            formatBalance(stat.stat) :
            
            stat.stat}
          </span>
          </>
          }
           
          </p>
          {stat.showStatPercent && (
            <p
              className="text-[#0CAD47] bg-white shadow-[0px_0px_14px_0px_#00000030]
            rounded-[99px] text-xs sm:text-sm px-[5px] py-1 sm:py-2 w-fit  flex items-center gap-3"
            >
              <ChevronUp className="text-[#0CAD47] size-4" />{" "}
              <span>
                <span className="font-semibold">{stat.statChange}%</span> vs Last Month
              </span>
            </p>
          )}
        </div>

        {stat.requestPayout && (
          <Button
          disabled={stat.disabled}
            onClick={stat.handleRequestPayout}
            className="w-full md:w-fit text-[#000000] font-medium shadow bg-white"
          >
            Request Payout
          </Button>
        )}
      </div>
    </div>
  );
};

export default StatCard;
