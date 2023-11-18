import React from "react";
import Layout from "../components/layout/Layout";
import SeoHead from "../components/SeoHead";
import Products from "../components/Products";

const contact = () => {
  return (
    <>
      <SeoHead title="Shop sneaker" />
      <Layout>
        <Products />
      </Layout>
    </>
  );
};

export default contact;
