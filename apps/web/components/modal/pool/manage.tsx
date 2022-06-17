import {
  Button,
  Divider,
  Grid,
  Group,
  Space,
  Stepper,
  Text,
  Title,
} from "@mantine/core";
import { ModalBase } from "../../../modals/base";
import { useState } from "react";
import { TbArrowBack, TbArrowForward } from "react-icons/tb";

export type ManageLiquidityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
};
export const ManageLiquidityModal = ({
  onBack,
  isOpen,
  onClose,
}: ManageLiquidityModalProps) => {
  const [active, setActive] = useState<number>(1);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <ModalBase
      onRequestClose={onClose}
      isOpen={isOpen}
      title={
        <>
          <Group position="left">
            <Title mt={8} mb={5} size={24}>
              ManagePool
            </Title>
          </Group>
          <Space h={1} />
          <Text color="dimmed">Manage your liquidty</Text>
          <Space h={4} />
        </>
      }
      hideCloseButton={true}
    >
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Create an account">
          <Grid>
            <Grid.Col span={5}></Grid.Col>
            <Grid.Col span={7}>
              <Title size={18}>2: </Title>
            </Grid.Col>
          </Grid>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          <Grid>
            <Grid.Col span={5}></Grid.Col>
            <Grid.Col span={7}>
              <Title size={18}>2: </Title>
            </Grid.Col>
          </Grid>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          <Grid>
            <Grid.Col span={5}></Grid.Col>
            <Grid.Col span={7}>
              <Title size={18}>3: </Title>
            </Grid.Col>
          </Grid>
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
      <Divider mt={8} mb={4} />
      <Group position="apart" grow noWrap>
        <Group position="left"></Group>
        <Group position="right" mt="xl">
          <Button
            size="xs"
            variant="default"
            leftIcon={<TbArrowBack />}
            onClick={prevStep}
          >
            Prev
          </Button>
          <Button
            size="xs"
            variant="filled"
            leftIcon={<TbArrowForward />}
            onClick={nextStep}
          >
            Next
          </Button>
        </Group>
      </Group>
    </ModalBase>
  );
};
