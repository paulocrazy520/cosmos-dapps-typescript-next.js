import { LayoutCard } from ".";
import { forwardRef } from 'react';
import {
  useMantineTheme,
  Group,
  Text,
  Avatar,
  Card,
  Progress,
  Space,
  Select,
  Flex,
  Container,
  TextInput,
  Menu,
  UnstyledButton,
  Image,
  createStyles,
  ScrollArea
} from "@mantine/core";

import { BsChevronDown } from "react-icons/bs"
import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { chainInfos } from "@/config/chain-infos";

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  describe: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

SelectItem.displayName = "name"

export const TradeFeatureCard: FunctionComponent<{ resHandler: any, type?: Boolean, }> = ({ resHandler, type = true }) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [amount, setAmount] = useState("200");
  const [fiatAmount, setFiatAmount] = useState("200");
  const [selected, setSelected] = useState(type ? chainInfos[0] : chainInfos[2]);


  const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({

    control: {
      width: 150,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 15px',
      borderRadius: theme.radius.md,
      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
        }`,
      transition: 'background-color 150ms ease',

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      },
    },

    label: {
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
    },

    icon: {
      transition: 'transform 150ms ease',
      transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
    },
  }));
  const { classes } = useStyles({ opened });
  const items = chainInfos.map((item) => (
    <Menu.Item
      icon={<Image src={item.currencies[0].coinImageUrl} width={18} height={18} />}
      onClick={() => {
        setSelected(item);
        resHandler(item.currencies[0].coinDenom);
      }}
      key={item.currencies[0].coinDenom}
    >
      {item.currencies[0].coinDenom}
    </Menu.Item>
  ));

  return (
    <Flex direction="column" align="center" gap="xs">
      {type ? <Text size="xl" weight={500} ta="center">{"Trade"}:</Text> : <></>}
      <Flex
        bg="rgba(0, 0, 0, .3)"
        gap="sm"
        align="left"
        direction="column"
        wrap="wrap"
        style={{ padding: "20px" }}
      >
        <Text size="lg">{type ? "Available balance" : "Receive"}:</Text>
        <Group >
          <Group noWrap position="apart">
            <Group>
              <Menu
                onOpen={() => setOpened(true)}
                onClose={() => setOpened(false)}
                radius="md"
                width="target"
              >
                <Menu.Target>
                  <UnstyledButton className={classes.control} >
                    <Group position="apart" >
                      <Image src={selected.currencies[0].coinImageUrl} width={30} height={30} />
                      <span className={classes.label}>{selected.currencies[0].coinDenom}</span>
                      <BsChevronDown size={16} className={classes.icon} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <ScrollArea style={{ height: 250 }} >{items}</ScrollArea></Menu.Dropdown>
              </Menu>
            </Group>
            <Card bg={"rgba(0,0,0,0,0)"} withBorder style={{ width: "150px", height: "100px", padding: "8px" }}>
              <Flex direction="column" justify="center" >
                <Flex align="center" direction="row" justify="center">
                  <Text size="lg" fw={200} >$</Text>
                  <Space w={5} />
                  <TextInput variant="unstyled" placeholder="0" size="lg" fw={200} value={amount} onChange={(event) => setAmount(event.currentTarget.value)}></TextInput>
                </Flex>
                <Flex align="center" direction="row" justify="center">
                  <TextInput variant="unstyled" placeholder="0" size="lg"  fw={200} value={fiatAmount} onChange={(event) => setFiatAmount(event.currentTarget.value)}></TextInput>
                  <Text size="lg" fw={200}>{selected.currencies[0].coinDenom}</Text>
                </Flex>
              </Flex>
            </Card>
          </Group>
        </Group>
      </Flex>
    </Flex >
  );
};
