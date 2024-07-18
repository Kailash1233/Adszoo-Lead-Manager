import Head from "next/head";
import Footer from "./components/Footer";
import LeadList from "./components/LeadList";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Lead Manager Adszoo</title>
        <meta name="description" content="Manage your leads effortlessly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto p-4">
        <LeadList />
      </main>

      <Footer />
    </div>
  );
}
