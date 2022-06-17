import {
    useMantineTheme,
    Space,
    Flex,
    Popover,
    Text,
    Collapse,
    Button,
    Card,
    Group,
    UnstyledButton,
    createStyles,
    Divider
} from "@mantine/core";

import { FunctionComponent, useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineRetweet } from "react-icons/ai";
import { useRouter } from "next/router";
import { TradeFeatureCard } from "./trade-feature";
import { BsChevronDown } from "react-icons/bs"

export const TradeMarketCard: FunctionComponent<{}> = ({ }) => {
    const router = useRouter();
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
        control: {
            width: 200,
            height: 50,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 15px',
            borderRadius: theme.radius.md,
            border: `1px solid ${theme.colorScheme === 'dark' ? "#5B4C4C" : theme.colors.gray[2]
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
    const [senderDenom, setSenderDenom] = useState('TOLLO')
    const [recvDenom, setRecvDenom] = useState('ATOM')

    return (
        <Flex direction="column" align="center">
            <TradeFeatureCard resHandler={setSenderDenom} type={true} />
            <Space h={20} />
            <IconContext.Provider value={{ color: "#5B4C4C", size: "30px" }}>
                <AiOutlineRetweet style={{ transform: 'rotate(90deg)' }} />
            </IconContext.Provider>
            <Space h={20} />
            <TradeFeatureCard resHandler={setRecvDenom} type={false} />
            <Space h={20} />

            <UnstyledButton className={classes.control} onClick={() => setOpened((o) => !o)} >
                <Group position="apart" >
                    <span className={classes.label}>{`1 ${senderDenom} = .88754 ${recvDenom}`}</span>
                    <BsChevronDown size={16} className={classes.icon} />
                </Group >
            </UnstyledButton>
            <Collapse in={opened}>
                <Card.Section>
                    <Space h={5} />
                    <Group position="apart">
                        <Text>Swap Fees(.3%)</Text>
                        <Text>0</Text>
                    </Group>
                    <Group position="apart">
                        <Text>Price Impact</Text>
                        <Text>0</Text>
                    </Group>
                    <Space h={5} />
                </Card.Section>
                <Divider />
                <Card.Section>
                    <Space h={5} />
                    <Group position="apart">
                        <Text>Estimated Slippage</Text>
                        <Text>0</Text>
                    </Group>
                    <Group position="apart">
                        <Text>Minimum received</Text>
                        <Text>0</Text>
                    </Group>
                </Card.Section>
                <Space h={5} />
            </Collapse>
            <Space h={20} />
            <Button size="lg">TRADE</Button>

        </Flex>
    );
};
