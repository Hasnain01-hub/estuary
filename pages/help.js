import React from "react";
import Contact from "../components/Contact";
import Layout from "../components/layout/Layout";
import SeoHead from "../components/SeoHead";

const contact = () => {
  return (
    <>
      <SeoHead title="Help" />
      <Layout>
        <Contact />
      </Layout>
    </>
  );
};

export default contact;
