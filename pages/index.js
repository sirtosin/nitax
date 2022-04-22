import Head from "next/head";
import Table from "../components/Table";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nitax App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table />
    </div>
  );
}

