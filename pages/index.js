import About from "../components/About";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";

import SeoHead from "../components/SeoHead";
//import Products from "../components/Products";
import Shop from "../components/Shop";

export default function Home() {
  return (
    <>
      <SeoHead title="Estuary" />
      <Layout>
        <Hero />
        <About />
        <Shop />
        <iframe
          src="https://embeds.beehiiv.com/1a5bd279-179b-45bb-8c46-40cb4539ab5c"
          data-test-id="beehiiv-embed"
          width="100%"
          height="320"
          frameborder="0"
          scrolling="no"
          style={{
            borderRadius: "4px",
            // border: "1px solid #e5e7eb",
            margin: " 0",
            backgroundColor: "transparent",
          }}
        ></iframe>
        {/* <Pricing /> */}
      </Layout>
    </>
  );
}
