import Navbar from "./components/Navbar";
import SummaryCards from "./components/Dashboards/SummaryCards";
import BalanceChart from "./components/Dashboards/BalanceChart";
import CategoryChart from "./components/Dashboards/CategoryChart";
import TransactionTable from "./components/Transactions/TransactionTable";
import InsightsPanel from "./components/Insights/InsightsPanel";

function App() {

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6">

        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <BalanceChart />
          <CategoryChart />
        </div>

        <TransactionTable />

        <InsightsPanel />

      </div>

    </div>

  );
}

export default App;