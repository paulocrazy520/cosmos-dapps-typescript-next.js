import { MantineTheme, useMantineTheme } from "@mantine/core";

export class Colors {
  protected _primary: string;
  protected _secondary: string;
  protected _accent: string;

  public get prim(): string {
    return this._primary;
  }
  public get sec(): string {
    return this._secondary;
  }
  public get acc(): string {
    return this._accent;
  }

  public blue(c: string): string {
    return c === "dark" ? this.blue[5] : this.blue[7];
  }
  public teal(c: string): string {
    return c === "dark" ? this.teal[5] : this.teal[7];
  }
  public violet(c: string): string {
    return c === "dark" ? this.violet[5] : this.violet[7];
  }
  public grape(c: string): string {
    return c === "dark" ? this.grape[5] : this.grape[7];
  }

  public readonly colors = {
    violet: (m: string): string => this.violet(m),
    teal: (m: string): string => this.teal(m),
    blue: (m: string): string => this.blue(m),
  };

  constructor(m: MantineTheme) {
    this._primary = this.violet(m.colorScheme);
    this._secondary = this.blue(m.colorScheme);
    this._accent = this.teal(m.colorScheme);
  }
}
