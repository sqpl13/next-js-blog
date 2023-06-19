import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h2>Contact Page</h2>
      </section>
    </Layout>
  );
}
