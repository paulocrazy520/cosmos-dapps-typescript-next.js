import { Anchor, ThemeIcon } from "@mantine/core";
import { TbExternalLink } from "react-icons/tb";

export type ExtLinkProps = {
  href: string;
  label?: string;
};

export const ExtLink = ({ href, label }: ExtLinkProps) => {
  return (
    <Anchor size="sm" color="blue" target={"_blank"} href={href}>
      {label ? label : href}
      <ThemeIcon ml={8} variant="filled" size="sm">
        <TbExternalLink size={10} />
      </ThemeIcon>
    </Anchor>
  );
};
