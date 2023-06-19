import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h2>About Me</h2>
        <p>Hello! My name is Sel. I am a Software Engineer.</p>
        <h2>What is Coder Quest?</h2>
        <p>
          "Coder Quest" captures the essence of a personal journey in the coding
          world. By combining the words "Coder" and "Quest," the blog name
          suggests a personal and adventurous pursuit of knowledge and growth in
          coding.
        </p>
      </section>
    </Layout>
  );
}
