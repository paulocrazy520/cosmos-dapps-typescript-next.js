import Image from "next/image";
import React, { FunctionComponent, ReactElement } from "react";
import { Box, Modal, Title } from "@mantine/core";
import classNames from "classnames";
import { useWindowSize } from "../hooks";
import { Btn } from "../components/buttons";
import { TbArrowBack } from "react-icons/tb";

// setAppElement("body");

export interface ModalBaseProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onRequestBack?: () => void;
  title?: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
}

export const ModalBase: FunctionComponent<ModalBaseProps> = ({
  isOpen,
  onRequestClose,
  onRequestBack,
  title,
  className,
  hideCloseButton = true,
  children,
}) => {
  const { isMobile } = useWindowSize();

  return (
    <Modal
      opened={isOpen}
      closeOnClickOutside={true}
      closeButtonLabel="Close"
      withCloseButton={true}
      withFocusReturn={true}
      centered
      radius="sm"
      size={"auto"}
      padding="md"
      shadow="lg"
      trapFocus
      overlayOpacity={0.5}
      closeOnEscape
      overlayBlur={3}
      transition="fade"
      title={<>{title} </>}
      onClose={() => {
        onRequestClose();
      }}
    >
      <>{children}</>
    </Modal>
  );
};
