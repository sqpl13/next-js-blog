import Link from "next/link";
import styles from "../styles/footer.module.css";

export default function Header() {
  return (
    <footer className={styles.footer}>
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
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.copyright}>Copyright © 2023 Coder's Quest</p>
    </footer>
  );
}
