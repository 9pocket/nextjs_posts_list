import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { API_BASE_URL, DEFAULT_DISPLAY_PER_PAGE } from '@/config/index';
import { useState, useMemo} from 'react';
import { useRouter } from "next/router";
import { PostTable } from "@/components/PostTable";
import {Button} from "react-bootstrap";

export default function Home({ initialPosts }) {

    const [posts, setPosts] = useState(initialPosts);
    const router = useRouter();

    const handleDelete = (deletedPost) => {
        setPosts(posts.filter(post => post.id !== deletedPost.id));
    };

    const handleShowSelected = (ids) => {
        if(ids.length > 0) {
            router.push(`/posts/${ids}`);
        }
    };

    const columns = useMemo(() => [
        {
            id: 'title',
            Header: "Post title",
            accessor: "title",
            sortType: 'basic'
        },
        {
            Header: 'Actions',
            Cell: ({row}) => (
                <div>
                    <Link href={`/posts/${row.original.id}`}>
                        <Button variant="outline-primary mr-2" size="sm">Show</Button>
                    </Link>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.original)}>Delete</Button>
                </div>
            )
        }
    ]);

    const initialState = {
        pageSize: DEFAULT_DISPLAY_PER_PAGE,
        sortBy: useMemo(() => [
            {
                id: 'title',
                desc: false
            }
        ])
    };

  return (
    <div>
      <Head>
        <title>Post app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Post table
        </h1>

        <div>
            <PostTable columns={columns} data={posts} initialState={initialState} handleShowSelected={handleShowSelected} />
        </div>

      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
    const res = await fetch(`${API_BASE_URL}/posts`);
    const posts = await res.json();

    if (!posts) {
        return {
            notFound: true,
        }
    }

    return {
        props: { initialPosts: posts }
    }
}