import Link from "next/link";
import styles from "../styles/card.module.css";

export default function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src="https://images.unsplash.com/photo-1612835362596-4b0b2b1b9b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
      </div>
      <div className={styles.cardContent}>
        <h3>Card Title</h3>
        <p>Card Description</p>
        <Link href="/blog">Read More</Link>
      </div>
    </div>
  );
}
