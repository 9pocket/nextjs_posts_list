import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { PostCard } from "@/components/PostCard";
import { Button, Row } from "react-bootstrap";
import Link from "next/link";

export default function ShowPostsPage() {

    const router = useRouter();
    let ids = [];
    if(router.query.ids !== undefined) {
        ids = router.query.ids.split(',');
    }

    return (
        <div>
            <Head>
                <title>Show posts</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Show posts</h1>
                <div className={styles.cardContainer}>
                    <Row xs={2} md={4} className="g-4">
                    {ids.map((id) => (
                        <PostCard postId={id} key={id}></PostCard>
                    ))}
                    </Row>
                    <Row>
                        <Link href={`/`}>
                            <Button variant="outline-primary" size="lg" style={{ margin: '2em 0'}}>Go back</Button>
                        </Link>
                    </Row>
                </div>
            </main>
        </div>
    );
}
