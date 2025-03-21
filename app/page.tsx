import DashboardLayout from "../components/components/shared/dashboard-layout";
import PayoutSection from "../components/components/shared/payout-card";
import StatsContainer from "../components/components/stats/stat-container";

const  Dashboard = () => {
  return (
    <DashboardLayout>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 md:mt-8">
        <PayoutSection />
        <StatsContainer />
      </main>
    </DashboardLayout>
  );
}


export default Dashboard