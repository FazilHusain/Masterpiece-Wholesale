import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TradeSidebar from "../../../components/website/trade/components/TradeSidebar";
import DashboardHome from "../../../components/website/trade/components/DashboardHome";
import TradeProfile from "../../../components/website/trade/components/TradeProfile";
import MyQuickOrders from "../../../components/website/trade/components/MyQuickOrders";
import MySampleOrders from "../../../components/website/trade/components/MySampleOrder";

export default function TradeDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const tradeData = JSON.parse(localStorage.getItem("tradeUser"));

    if (!tradeData) {
      navigate("/trade-login");
      return;
    }

    setUser(tradeData.user);
  }, [navigate]);

  if (!user) return null;

  return (
    <section className="min-h-screen bg-[#F7F3EB]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <TradeSidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {activeTab === "dashboard" && (
            <DashboardHome user={user} setActiveTab={setActiveTab} />
          )}

          {activeTab === "quick-order" && <MyQuickOrders user={user}/>}

          {activeTab === "sample-order" && <MySampleOrders user={user}/>}

          {activeTab === "profile" && <TradeProfile user={user} />}
        </div>
      </div>
    </section>
  );
}
