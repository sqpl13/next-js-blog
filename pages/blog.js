import fs from "fs";
import path from "path";
import cheerio from "cheerio";
import Link from "next/link";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Blog({ posts }) {
  return (
    <Layout>
      <section className={utilStyles.mainWrapper}>
        <h1>Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "pages", "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const $ = cheerio.load(fileContents);
    const title = $("title").text();

    return {
      slug: filename.replace(/\.md$/, ""),
      title: title,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
