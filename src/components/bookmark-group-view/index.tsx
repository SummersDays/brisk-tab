import { BookmarkGroup } from "@/types";

import BookmarkItemView from "../bookmark-item-view";
import styles from "./index.module.css";

interface BookmarkGroupProps {
  group: BookmarkGroup;
}

export default function BookmarkGroupView(props: BookmarkGroupProps) {
  const { group } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.name}>{group.name}</h2>
      <ul className={styles.list}>
        {group.bookmarks.map((bookmark) => (
          <BookmarkItemView key={bookmark.url} bookmark={bookmark} />
        ))}
      </ul>
    </section>
  );
}
