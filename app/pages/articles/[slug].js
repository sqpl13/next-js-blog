import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import styles from "../../styles/utils.module.css";
import sanityClient from "../../utils/sanity";

export async function getStaticProps() {
  try {
    const response = await sanityClient.get("", {
      params: {
        query:
          '*[_type == "article"]{title, slug, content, publicationDate, "author": author->name, "coverImage": coverImage.asset->{url}}',
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

export async function getStaticPaths() {
  try {
    const response = await sanityClient.get("", {
      params: {
        query: '*[_type == "article"]{slug}',
      },
    });

    const articles = response.data.result;

    const paths = articles.map((article) => ({
      params: { slug: article.slug.current },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export default function Article({ articles }) {
  return (
    <>
      {articles.map((article) => (
        <Layout key={article.slug.current}>
          <Head>
            <title>{article.title}</title>
          </Head>
          <article>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.meta}>
              By: {`${article.author} Published: ${article.publicationDate}`}
            </p>
            <img
              src={`${article.coverImage.url}`}
              className={styles.coverImage}
              alt="Cover Image"
            />
            {article.content.map((block) => (
              <>
                {block._type === "block" && block.style === "h2" && (
                  <h2>{block.children[0].text}</h2>
                )}
                {block._type === "block" &&
                  block.style === "normal" &&
                  block.children.map((child) => (
                    <p key={child._key} style={{ whiteSpace: "pre-line" }}>
                      {child.text}
                    </p>
                  ))}
              </>
            ))}
          </article>
        </Layout>
      ))}
    </>
  );
}
