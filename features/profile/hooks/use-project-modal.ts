import { useQueryState, parseAsBoolean } from "nuqs";

export const useProjectModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "project",
    parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    }),
  );
  const [id, setId] = useQueryState("id", {
    clearOnDefault: true,
  });

  const open = (id?: string) => {
    setIsOpen(true);

    if (id) setId(id);
  };

  const close = () => {
    setIsOpen(false);
    setId(null);
  };

  return {
    open,
    close,
    isOpen,
    setIsOpen,
    id,
    setId,
  };
};
