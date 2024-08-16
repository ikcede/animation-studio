import Gallery from "@/components/gallery/Gallery";
import styles from "./page.module.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import CreateIcon from '@mui/icons-material/Create';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          CSS Animation Studio
        </h1>
        <div className={styles.description}>
          Browse through a library of awesome CSS 
          animations and customize them to fit your webpage!
        </div>
        <div className={styles.buttons}>
          <Link href='/editor'>
            <Button className='button'
                    startIcon={<CreateIcon/>}
                    variant='outlined'>
              Custom Editor
            </Button>
          </Link>
        </div>
      </div>
      <Gallery></Gallery>
    </main>
  );
}
