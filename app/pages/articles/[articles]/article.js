import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import sanityClient from "../sanity";

export async function getStaticProps() {
  try {
    const response = await sanityClient.get("", {
      params: {
        query: '*[_type == "article"]{title, slug, content}',
      },
    });

    const articles = response.data.result;

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
}

export default function Article({ articles }) {
  return (
    <>
      {articles.map((article) => (
        <Layout>
          <Head>
            <title>{article.title}</title>
          </Head>
          <article key={article.slug.current}>
            <h2>{article.title}</h2>
            <div>{article.content}</div>
          </article>
        </Layout>
      ))}
    </>
  );
}
