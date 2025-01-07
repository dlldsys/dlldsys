'use client'

import styles from "./page.module.css";
import MyDocument from "./pages/_document";

export default function Home() {
  return (
    <div className={styles.page}>
      <div>
        <MyDocument></MyDocument>
      </div>
    </div>
  );
}
