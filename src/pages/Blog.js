import React, { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion-x';
import { Link } from 'react-router-dom';
import { notion } from '../config'
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // 추가: 포스트를 클릭했을 때 Detail 페이지로 이동하기 위해

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `/api/v1/databases/${notion.databaseId}/query`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Notion-Version': '2021-08-16',
                            Authorization: `Bearer ${notion.secret}`,
                        },
                        body: JSON.stringify({ databaseId: `${notion.databaseId}` }),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const { results } = await response.json();
                console.log("통신 성공:", results);
                setPosts(results);
            } catch (error) {
                console.error("통신 실패:", error);
            }
        };

        fetchPosts();
    }, [notion.databaseId]);

    return (
        <>
            <div>포스트 수: {posts.length}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {posts.map((post) => (
                    <Link to={`/detail/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            maxWidth: '400px'
                        }}>
                            {post.cover && (
                                <img
                                    src={post.cover.type === 'external' ? post.cover.external.url : post.cover.file.url}
                                    alt="Cover"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '200px',
                                        objectFit: 'cover'
                                    }}
                                />
                            )}
                            <div style={{ padding: '20px' }}>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                                    {post.properties?.Name?.title?.[0]?.plain_text || "No Title"}
                                </h2>
                                <div style={{ marginBottom: '10px' }}>
                                    태그:
                                    {post.properties?.태그?.multi_select?.map(tag => (
                                        <span key={tag.id} style={{
                                            display: 'inline-block',
                                            padding: '4px 8px',
                                            backgroundColor: '#f0f0f0',
                                            borderRadius: '4px',
                                            marginRight: '5px'
                                        }}>{tag.name}</span>
                                    ))}
                                </div>
                                <NotionRenderer blockMap={post.properties?.Content?.rich_text || {}} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Blog;
