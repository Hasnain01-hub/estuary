import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import UpperButton from "../../components/sidebar/Button";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import SeoHead from "../../components/SeoHead";

const Mailbody = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [mail, setmail] = useState([]);
  const [open, setOpen] = useState(false);
  const { id } = router.query;
  useEffect(() => {
    const getdat = async () => {
      if (id) {
        setloading(false);
        const res = await axios.get(
          `https://sneaker-api-phi.vercel.app/getMailBody/${id}`
        );
        const data = await res.data;
        if (res.data.length > 0) {
          setmail(data);
        } else {
          setmail([]);
        }
      }
      setloading(true);
    };
    getdat();
  }, [id]);
  return (
    <>
      <SeoHead title={!loading ? "" : mail[0] && mail[0].subject} />
      <Layout>
        <div className="w-full py-20 lg:py-24">
          <UpperButton setOpen={setOpen} open={open} />
          <div className="flex flex-nowrap">
            <Sidebar open={open} />
            <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              <div className="container mx-auto">
                {!loading ? (
                  <div className="flex items-center justify-center w-full h-screen">
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 50,
                          }}
                          spin
                        />
                      }
                    />
                  </div>
                ) : (
                  <div>
                    <div>
                      <Link href="/profile/notifications">
                        <svg
                          className=" w-8 m-2 cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                        </svg>
                        <p className="font-para text-gray-700  dark:text-gray-400 para">
                          {mail[0].subject}
                        </p>
                      </Link>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: mail[0].template.body,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Mailbody;
