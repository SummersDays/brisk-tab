import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import useBookmarks from "@/hooks/use-bookmarks";
import { useGlobalSearch } from "@/hooks/use-global-search";
import { Bookmark } from "@/types";
import Input from "@/ui/input";

import ResultItem from "./components/result-item";
import styles from "./index.module.css";

const KEY_ACTION: Record<string, (event: KeyboardEvent) => boolean> = {
  OPEN: (e) => e.key === "/" || (e.key === "k" && e.metaKey),
  CLOSE: (e) => e.key === "Escape"
};

export default function GlobalSearch() {
  const [keyword, setKeyword] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { bookmarks } = useBookmarks();
  const { isOpen: isShowSearch, setIsOpen: setIsShowSearch } =
    useGlobalSearch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (KEY_ACTION.OPEN(event)) {
        setIsShowSearch(true);
      } else if (KEY_ACTION.CLOSE(event)) {
        if (document.activeElement === searchInputRef.current) {
          searchInputRef.current?.blur();
          return;
        }

        setIsShowSearch(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsShowSearch]);

  const results = useMemo<Bookmark[]>(() => {
    if (!keyword) {
      return [];
    }

    return bookmarks.filter(
      (bookmark) =>
        bookmark.name.toLowerCase().includes(keyword.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, bookmarks]);

  const deferredResults = useDeferredValue(results);

  useEffect(() => {
    const inputElement = searchInputRef.current;
    let timer = 0;
    if (isShowSearch) {
      timer = window.setTimeout(() => {
        inputElement?.focus();
        inputElement?.select();
      }, 100);
    }

    return () => {
      inputElement?.blur();
      inputElement?.setSelectionRange(0, 0);
      clearTimeout(timer);
    };
  }, [isShowSearch]);

  if (!isShowSearch) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={() => setIsShowSearch(false)} />
      <div className={styles.content}>
        <div className="px-lg">
          <Input
            value={keyword}
            placeholder="Search bookmarks name or url..."
            field="keyword"
            ref={searchInputRef}
            className={styles.search}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="px-lg flex-auto overflow-auto">
          {deferredResults.map((bookmark) => (
            <ResultItem
              key={`${bookmark.groupId}-${bookmark.url}`}
              bookmark={bookmark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
