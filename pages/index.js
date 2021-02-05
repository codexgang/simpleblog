import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

let client = require("contentful").createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN_API,
});

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: "article",
  });
  return {
    props: {
      articles: data.items,
    },
    revalidate: 1,
  };
}

export default function Home({ articles }) {
  console.log(articles);
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.sys.id}>
          <Link href={"/articles/" + article.fields.slug}>
            <a>{article.fields.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
