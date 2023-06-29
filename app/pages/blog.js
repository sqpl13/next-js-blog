import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../styles/utils.module.css";
import sanityClient from "../utils/sanity";

export async function getServerSideProps() {
  try {
    const response = await sanityClient.get("", {
      params: {
        query:
          '*[_type == "article"] | order(publicationDate desc) {title, slug, content, publicationDate, "category":category->{title}, "author": author->name, "coverImage": coverImage.asset->{url}}',
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

export default function Blog({ articles }) {
  const [visibleArticles, setVisibleArticles] = useState(10); // Number of posts to display initially
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreArticles();
  }, [isFetching]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isFetching
    ) {
      setIsFetching(true);
    }
  };

  const fetchMoreArticles = () => {
    if (visibleArticles >= articles.length) {
      setIsFetching(false);
      return;
    }
    setTimeout(() => {
      setVisibleArticles(visibleArticles + 10); // Increase the number of visible articles
      setIsFetching(false);
    }, 2000);
  };

  return (
    <Layout>
      {" "}
      {/* Move the Layout component outside the loop */}
      <Head>
        <title>Blog</title>
      </Head>
      {articles.slice(0, visibleArticles).map((article) => {
        const firstNormalBlock = article.content.find(
          (block) => block._type === "block" && block.style === "normal"
        );

        const firstParagraph = firstNormalBlock?.children[0].text
          .split(" ")
          .slice(0, 50)
          .join(" ");

        return (
          <article key={article.slug.current}>
            <h1 className={styles.title}>
              <Link href={`/blog/${article.slug.current}`}>
                {article.title}
              </Link>
            </h1>
            <p className={styles.meta}>
              By:{" "}
              {`${article.author} Published: ${article.publicationDate} In: ${article.category.title}`}
            </p>
            <img
              src={`${article.coverImage.url}`}
              className={styles.coverImage}
              alt="Cover Image"
            />
            {firstParagraph && (
              <p key={firstNormalBlock._key} style={{ whiteSpace: "pre-line" }}>
                {firstParagraph}...
              </p>
            )}
          </article>
        );
      })}
      {isFetching && <p>Loading more articles...</p>}
    </Layout>
  );
}
