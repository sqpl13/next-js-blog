import Head from "next/head";
import Image from "next/image";
import styles from "../styles/layout.module.css";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";

const name = "Sel L.";
export const siteTitle = "Coder's Quest";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
