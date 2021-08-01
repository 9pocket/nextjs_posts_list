import { Button, Card, Col } from 'react-bootstrap';
import { API_BASE_URL } from '@/config/index';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export function PostCard({ postId }) {

    const [post, setPost] = useState(null);
    useEffect(() => {
        fetch(`${API_BASE_URL}/posts/${postId}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [])

    if (!post) return <div>loading...</div>

    return (
        <Col>
            <Card style={{ width: '250px', marginBottom: '1em' }}>
                <Card.Img variant="top" src={`https://lorempixel.com/250/250?q=${postId}`} />
                <Card.Body>
                    <Card.Title>{ post.title }</Card.Title>
                    <Card.Text>
                        { post.body }
                    </Card.Text>
                    <Button variant="primary">Go to details</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}
