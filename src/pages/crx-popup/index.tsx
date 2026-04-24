import { useEffect, useRef, useState } from "react";

import EditBookmarkForm, {
  EditBookmarkFormRef
} from "@/components/edit-bookmark-form";
import useBookmarks from "@/hooks/use-bookmarks";
import { UngroupedBookmark } from "@/types";
import Button from "@/ui/button";

import styles from "./index.module.css";

export default function CrxPopup() {
  const { addBookmarks } = useBookmarks();
  const [errTip, setErrTip] = useState("");
  const [successTip, setSuccessTip] = useState("");
  const [tabBookmark, setTabBookmark] = useState<UngroupedBookmark>();
  const formRef = useRef<EditBookmarkFormRef>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setTabBookmark({
        name: tabs[0].title || "",
        url: tabs[0].url || ""
      });
    });
  }, []);

  const handleOpenMainTab = () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("index.html")
    });
  };

  const handleAddBookmark = () => {
    const err = formRef.current?.validate();
    if (err) {
      setErrTip(err);
      return;
    }

    const formData = formRef.current?.getFormData();

    if (!formData) {
      return;
    }

    const count = addBookmarks([formData], formData.groupId);
    if (count > 0) {
      setSuccessTip("Bookmark added.");
      setErrTip("");
    } else {
      setSuccessTip("");
      setErrTip("Bookmark already exists.");
    }
  };

  return (
    <section className="w-100 p-4">
      <div className={styles.header}>
        <h1 className={styles.title}>
          <div className={styles.icon} />
          <span>Add as bookmark</span>
        </h1>
        <div className="flex-auto" />
        <div className={styles.operations}>
          <div className={styles.open} onClick={handleOpenMainTab} />
        </div>
      </div>
      <EditBookmarkForm
        key={tabBookmark?.url ?? ""}
        bookmark={tabBookmark}
        ref={formRef}
      />
      <div className="flex justify-end items-baseline">
        <div className="text-sm">
          {successTip && <p className="text-brand-primary">{successTip}</p>}
          {errTip && <p className="text-brand-error">{errTip}</p>}
        </div>
        <div className="flex-auto" />
        <Button variant="primary" onClick={handleAddBookmark}>
          Add
        </Button>
      </div>
    </section>
  );
}
