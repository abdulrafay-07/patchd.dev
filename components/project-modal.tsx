"use client"

import { useProjectModal } from "@/features/profile/hooks/use-project-modal";

import { ResponsiveModal } from "@/components/responsive-modal";
import { ProjectForm } from "@/components/project-form";

export const ProjectModal = () => {
  const { isOpen, setIsOpen, close } = useProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <ProjectForm onCancel={close} />
    </ResponsiveModal>
  )
};
