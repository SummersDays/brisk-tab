import EditingModeButton from "../editing-mode-button";
import ExportDataButton from "../export-data-button";
import GlobalSearchButton from "../global-search-button";
import ImportFromButton from "../import-from-button";
import styles from "./index.module.css";

export default function HeaderOperation() {
  return (
    <div className={styles.container}>
      <EditingModeButton />
      <GlobalSearchButton />
      <ImportFromButton />
      <ExportDataButton />
    </div>
  );
}
