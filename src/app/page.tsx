import Gallery from "@/components/gallery/Gallery";
import styles from "./page.module.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            CSS Animation Studio
          </h1>
          <div className={styles.info}>
            <div className={styles.description}>
              Browse through a library of awesome CSS 
              animations and customize them to fit your webpage!
            </div>
            <div className={styles.buttons}>
              <Link href='/editor'>
                <Button className='button-cta'
                        variant='outlined'>
                  Open Editor
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Gallery></Gallery>
      </main>
      <footer className={styles.footer}>
        <Footer></Footer>
      </footer>
    </>
  );
}
