import { Button, Group, Radio, Text, Title } from "@mantine/core";
import {
  ContextModalProps,
  ModalsProvider,
  openContextModal,
} from "@mantine/modals";

export interface WalletModalsProps {
  title: string;
  children: React.ReactNode;
  context: any;
  id: any;
}
export const WalletModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string; title: string }>) => (
  <>
    <Title size="sm">{innerProps.title}</Title>
    <Radio value="keplr">Keplr</Radio>
    <Radio value="wc">WalletConnect</Radio>
    {innerProps.modalBody}
    <footer>
      <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
        Close modal
      </Button>
      <Button onClick={() => context.closeModal}>OK</Button>
    </footer>
  </>
);

export function WalletConnectModal() {
  return (
    <Group position="center">
      <Button
        onClick={() =>
          openContextModal({
            modal: "demonstration",
            title: "Test modal from context",
            innerProps: {
              modalBody:
                "This modal was defined in ModalsProvider, you can open it anywhere in you app with useModals hook",
            },
          })
        }
      >
        Open demonstration context modal
      </Button>
    </Group>
  );
}
