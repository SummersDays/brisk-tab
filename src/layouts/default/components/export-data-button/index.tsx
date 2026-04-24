import { useState } from "react";

import ExportDataModal from "../export-data-modal";

export default function ExportDataButton() {
  const [isOpenExportDataModal, setIsOpenExportDataModal] = useState(false);

  return (
    <>
      <div className="brand-btn" onClick={() => setIsOpenExportDataModal(true)}>
        <div className="i-fluent-database-arrow-right-20-regular" />
      </div>
      <ExportDataModal
        isOpen={isOpenExportDataModal}
        onClose={() => setIsOpenExportDataModal(false)}
      />
    </>
  );
}
