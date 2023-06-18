import Link from "next/link";
import styles from "../styles/footer.module.css";

export default function Header() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link href="/">My Blog</Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
