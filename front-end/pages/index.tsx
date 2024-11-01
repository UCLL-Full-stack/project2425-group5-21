import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from "@/components/header";

const Home: React.FC = () => {
  return (
      <>
        <Head>
          <title>Courses</title>
          <meta name="description" content="Courses app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
          <main className={styles.main}>
            <span>
              <h1>Welcome!</h1>
            </span>
          </main>
      </>
  );
};

export default Home;
