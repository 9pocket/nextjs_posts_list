import { useRouter } from "next/router";

export default function PostShowPage() {

    const router = useRouter();

    return (
        <div>
            <h1>PostShowPage</h1>
            <h2>{router.query.ids}</h2>
        </div>
    )
}
