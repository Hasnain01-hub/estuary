import React, { useState } from "react";
import Dashboard from "../../components/Layout/Dashboard";
import Layout from "../../../components/layout/Layout";
import UpperButton from "../../components/sidebar/Button";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";

const Userdashboard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Layout>
        <div className="w-full py-20 lg:py-24">
          <UpperButton setOpen={setOpen} open={open} />
          <div className="flex flex-nowrap">
            <Sidebar open={open} />
            <div className="flex-1 overflow-x-hidden overflow-y-auto sm:overflow-y-hidden bg-gray-200">
              <div className="container mx-auto">
                <Dashboard user={user} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Userdashboard;
