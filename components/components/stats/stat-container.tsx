"use client";
import React from "react";
import StatCard, { IStatCard } from "./stat-card";
import {
  useGetBuinessReferred,
  useGetPartnerTotalRevenue,
  usePartnerCurrentRevenue,
} from "@/services/dashboard";

const StatsContainer = () => {
  const { isLoading, data } = useGetPartnerTotalRevenue();
  const { isPending, data: currentRevenue } = usePartnerCurrentRevenue();
  const {data:businessReferred, isFetching} = useGetBuinessReferred()

  const statsData: IStatCard[] = [
    {
      title: "Total Revenue",
      isCurrency: true,
      variant: "cyan",
      isLoading: isLoading,
      stat: data?.total_revenue ?? 0,
      showStatPercent: true,
      statChange: data?.percentage_change ?? 0,
    },
    {
      title: "Current Revenue",
      isCurrency: true,
      variant: "yellow",
      stat: currentRevenue?.current_revenue ?? 0,
      isLoading: isPending,
      showStatPercent: true,

      statChange: currentRevenue?.percentage_change ?? 0,
    },
    {
      title: "Total Businesses Referred",
      isCurrency: false,
      variant: "lightblue",
      stat: businessReferred?.total_referred ?? 0,
      isLoading: isFetching,
      statChange: 10,
    },
    {
      title: "Total Earnings",
      isCurrency: true,
      variant: "ocean",
      showStatPercent: true,
      isLoading: isLoading,
      stat: data?.total_earnings ?? 0,
      statChange: data?.percentage_change ?? 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {statsData.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
};

export default StatsContainer;
