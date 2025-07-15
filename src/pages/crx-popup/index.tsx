import { ChangeEvent, useEffect, useState } from "react";
import { first } from "remeda";

import useBookmarkGroups from "@/hooks/use-bookmark-groups";
import useBookmarks from "@/hooks/use-bookmarks";
import Button from "@/ui/button";
import Input from "@/ui/input";
import Select from "@/ui/select";

import styles from "./index.module.css";

function CrxPopup() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const { addBookmarks } = useBookmarks();
  const { groups } = useBookmarkGroups();
  // TODO: default use recent used group
  const [group, setGroup] = useState(groups[0]);
  const [errTip, setErrTip] = useState("");
  const [successTip, setSuccessTip] = useState("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setName(first(tabs)?.title || "");
      setUrl(first(tabs)?.url?.trim() || "");
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setSuccessTip("");
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setErrTip("");
  }, [name, url, group]);

  const handleOpenMainTab = () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("index.html")
    });
  };

  const handleSelectGroup = (ev: ChangeEvent<HTMLSelectElement>) => {
    const id = ev.target.value;
    const target = groups.find((item) => item.id === id);
    if (target) {
      setGroup(target);
    }
  };

  const handleAddBookmark = () => {
    const count = addBookmarks(
      [{ name: name.trim(), url: url.trim() }],
      group.id
    );
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
      <Input
        field="name"
        label="Bookmark name"
        placeholder="A cool website"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        field="url"
        label="Bookmark URL"
        placeholder="http://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Select
        field="group"
        label="Select a group"
        options={groups.map((item) => ({
          label: item.name,
          value: item.id
        }))}
        value={group.id}
        onChange={handleSelectGroup}
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

const CrxPopupPage = process.env.CRX_BUILD === "1" ? CrxPopup : () => null;

export default CrxPopupPage;
