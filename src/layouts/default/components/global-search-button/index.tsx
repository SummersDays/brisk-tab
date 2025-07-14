import { useGlobalSearch } from "@/hooks/use-global-search";

export default function GlobalSearchButton() {
  const { setIsOpen } = useGlobalSearch();

  return (
    <div className="brand-btn" onClick={() => setIsOpen(true)}>
      <div className="i-fluent-search-12-regular mx-1px mt-2px text-[18px]" />
    </div>
  );
}
