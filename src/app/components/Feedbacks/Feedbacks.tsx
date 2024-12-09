import { render } from "storyblok-rich-text-react-renderer";
import styles from "./Feedbacks.module.css";

export default function Feedbacks({ blok }: { blok: any }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head_wrp}>
          <h2>{render(blok.title)}</h2>
        </div>
      </div>
    </section>
  );
}
