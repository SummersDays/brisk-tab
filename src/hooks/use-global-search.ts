import { atom, useAtom } from "jotai";

const isOpenGlobalSearchAtom = atom(false);

export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useAtom(isOpenGlobalSearchAtom);

  return {
    isOpen,
    setIsOpen
  };
}
