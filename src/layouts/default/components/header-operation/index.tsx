import GlobalSearchButton from "../global-search-button";
import ImportFromButton from "../import-from-button";
import styles from "./index.module.css";

export default function HeaderOperation() {
  return (
    <div className={styles.container}>
      <GlobalSearchButton />
      <ImportFromButton />
    </div>
  );
}
