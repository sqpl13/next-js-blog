import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import styles from "../../styles/utils.module.css";
import sanityClient from "../../utils/sanity";

export async function getStaticProps({ params }) {
  try {
    const response = await sanityClient.get("", {
      params: {
        query: `*[_type == "article" && slug.current == "${params.slug}"]{title, slug, content, publicationDate, "category":category->{title}, "author": author->name, "coverImage": coverImage.asset->{url}}`,
      },
    });

    const article = response.data.result[0];

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return {
      props: {
        article: null,
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

export default function Article({ article }) {
  if (!article) {
    // Handle case where article is not found
    return (
      <Layout>
        <p>Article not found.</p>
      </Layout>
    );
  }

  const renderBlockContent = (block) => {
    if (block._type === "block" && block.children) {
      return block.children.map((child, index) => {
        if (child._type === "span" && child.marks) {
          const hasLink = child.marks.some((mark) => mark._type === "link");
          if (hasLink) {
            return (
              <a key={index} href={child.marks[0].href} className={styles.link}>
                {child.text}
              </a>
            );
          }
        }
        return <span key={index}>{child.text}</span>;
      });
    }
    return null;
  };

  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
      </Head>
      <article>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.meta}>
          By:{" "}
          {`${article.author} Published: ${article.publicationDate} In: ${article.category.title}`}
        </p>
        <img
          src={`${article.coverImage.url}`}
          className={styles.coverImage}
          alt="Cover Image"
        />
        {article.content.map((block, index) => (
          <React.Fragment key={index}>
            {block._type === "block" && block.style === "h2" && (
              <h2>{block.children[0].text}</h2>
            )}
            {block._type === "block" && block.style === "normal" && (
              <p
                key={block._key}
                style={{ whiteSpace: "pre-line" }}
                className={styles.blockContent}
              >
                {renderBlockContent(block)}
              </p>
            )}
          </React.Fragment>
        ))}
      </article>
    </Layout>
  );
}
