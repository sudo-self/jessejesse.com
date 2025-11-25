import "../styles/globals.css";
import Footer from "./Footer";
import Header from "./Header";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import { Analytics } from "@vercel/analytics/react";
import RouteTransitions from "../components/RouteTransitions";
import Head from "next/head";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <main className="">
      <NextNProgress
        options={{
          showSpinner: false,
        }}
        color="#360267ff"
        startPosition={0.1}
        stopDelayMs={100}
        height={3}
        showOnShallow={false}
      />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{
          duration: 0.5,
        }}
      >
        <Header />
        {/* <SiteTransitions> */}
        <RouteTransitions>
          <main className="pt-20 px-[15px] xs:px-[25px] mx-auto max-w-4xl">
            <Script
              src="https://jessejesse.com/theme.js"
              strategy="beforeInteractive"
            />
            <Component {...pageProps} />
            <Analytics />
          </main>
        </RouteTransitions>
      </motion.div>
      <Footer />
    </main>
  );
}

export default MyApp;

