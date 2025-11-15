import { useClipboard } from "foxact/use-clipboard";
import { useId, useState } from "react";
import { first } from "remeda";

import useBookmarks from "@/hooks/use-bookmarks";
import Button from "@/ui/button";
import Modal from "@/ui/modal";
import Select, { SelectOption } from "@/ui/select";

import { ExportData } from "./types";

const EXPORT_DATA_OPTION: Array<SelectOption> = [
  {
    label: "Copy to clipboard",
    value: "copy-to-clipboard"
  }
];

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportDataModal({
  isOpen,
  onClose
}: ExportDataModalProps) {
  const { copy } = useClipboard();
  const [method, setMethod] = useState(() => first(EXPORT_DATA_OPTION)?.value);
  const selectorField = useId();
  const { bookmarks } = useBookmarks();

  const handleConfirm = async () => {
    if (method === "copy-to-clipboard") {
      await copy(JSON.stringify({ bookmarks } satisfies ExportData));
    }
    onClose();
  };

  return (
    <Modal
      title="Select export method"
      isOpen={isOpen}
      onClose={onClose}
      operation={
        <div className="flex gap-xs">
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      }
    >
      <p className="text-sm mb-2">
        Exporting data will copy a JSON text containing all your bookmarks.
      </p>

      <Select
        options={EXPORT_DATA_OPTION}
        field={selectorField}
        onChange={(e) => setMethod(e.target.value)}
        value={method}
      />
    </Modal>
  );
}
