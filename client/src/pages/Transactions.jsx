import React from "react";
import Sidebar from "../components/user/Sidebar";
import TransactionsTable from "../components/user/TransactionsTable";

const Transactions = () => {
  return (
    <div className="flex w-full">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <section className="w-full min-h-screen bg-dashboard py-24 px-10 text-white font-poppins">
        <div className="w-3/4 mx-auto">
          <TransactionsTable />
        </div>
      </section>
    </div>
  );
};

export default Transactions;
