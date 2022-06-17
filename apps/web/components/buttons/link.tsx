import { NextLink } from "@mantine/next";
import { Button } from "@mantine/core";

export interface ButtonLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
  styles: any;
}

export default function ButtonLink({
  label,
  children,
  href,
  styles,
}: ButtonLinkProps) {
  return (
    <Button component={NextLink} href={href} styles={styles}>
      {label}
    </Button>
  );
}
