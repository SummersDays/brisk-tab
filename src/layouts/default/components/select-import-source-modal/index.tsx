import { ChangeEvent, useId, useState } from "react";

import { UngroupedBookmark } from "@/types";
import Button from "@/ui/button";
import Modal from "@/ui/modal";
import Select, { SelectOption } from "@/ui/select";
import convertNetscapeBookmark from "@/utils/convert-chrome-bookmark";
import readLocalFile from "@/utils/read-local-file";

import { parseChromeBookmarkNodes } from "../../utils";

interface SelectImportSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportFromFile?: (bookmarks: UngroupedBookmark[]) => void;
  onImportFromBrowser?: (bookmarks: UngroupedBookmark[]) => void;
}

const IMPORT_SOURCE_OPTIONS: Array<SelectOption> = [
  {
    label: `From current browser bookmarks${
      import.meta.env.CRX_BUILD !== "1" ? " (Only for extension version)" : ""
    }`,
    value: "browser",
    isDisabled: import.meta.env.CRX_BUILD !== "1"
  },
  {
    label: "From bookmark export file",
    value: "file"
  }
] as const;

const SELECT_FILE_BUTTON_LABEL = "Select File";

export default function SelectImportSourceModal({
  isOpen,
  onClose,
  onImportFromFile,
  onImportFromBrowser
}: SelectImportSourceModalProps) {
  const [importSource, setImportSource] = useState<string>();
  const selectorField = useId();

  // TODO: is firefox compatible?
  const handleParseRuntimeBookmarks = async () => {
    if (import.meta.env.CRX_BUILD !== "1") {
      return;
    }

    const tree = await chrome.bookmarks.getTree();
    const bookmarks = parseChromeBookmarkNodes(tree);
    onImportFromBrowser?.(bookmarks);
  };

  // TODO: is firefox compatible?
  const handleParseChromeBookmarkFile = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const fileContent = await readLocalFile(file);
    const res = convertNetscapeBookmark(fileContent);
    e.target.value = "";
    onImportFromFile?.(res);
  };

  return (
    <Modal
      title="Select import source"
      isOpen={isOpen}
      onClose={onClose}
      operation={
        <div className="flex gap-xs">
          <Button onClick={onClose}>Cancel</Button>
          {importSource === "file" ? (
            <Button variant="primary">
              <label className="cursor-pointer">
                <span>{SELECT_FILE_BUTTON_LABEL}</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleParseChromeBookmarkFile}
                />
              </label>
            </Button>
          ) : (
            <Button variant="primary" onClick={handleParseRuntimeBookmarks}>
              Confirm
            </Button>
          )}
        </div>
      }
    >
      <p className="text-sm mb-2 text-brand-primary italic">
        Import any browser bookmarks to Brisk Tab.
      </p>
      <Select
        field={selectorField}
        options={IMPORT_SOURCE_OPTIONS}
        onChange={(e) => setImportSource(e.target.value)}
        value={importSource}
      />
      {importSource === "sync" ? (
        "Import from bookmark export file"
      ) : (
        <>
          <p className="op-60 text-sm mb-2">
            Before continuing, you should prepare the export file of your
            bookmarks from the browser's bookmark manager.
          </p>
          <p className="op-60 text-sm mb-2">
            <span>And then click the</span>
            <strong className="mx-1">{SELECT_FILE_BUTTON_LABEL}</strong>
            <span>button to select this file.</span>
          </p>
        </>
      )}
    </Modal>
  );
}
