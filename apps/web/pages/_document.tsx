import { createGetInitialProps } from "@mantine/next";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

const mantineInitialProps = createGetInitialProps();

export default class _Document extends Document {
  // static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {

  //   return await getInitialProps(ctx);
  // }
  static getInitialProps = createGetInitialProps();
  // static async getInitialProps(
  //   ctx: DocumentContext
  // ): Promise<DocumentInitialProps> {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   const newInitialProps: DocumentInitialProps = mantineInitialProps(ctx);

  //   return newInitialProps;
  // }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
