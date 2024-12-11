import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Layout>

      <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}



