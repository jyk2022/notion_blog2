import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NotionRenderer } from "react-notion";
import { notion } from '../config';

const Detail = () => {
    const { pageId } = useParams();
    const [page, setPage] = useState(null);

    const fetchPage = async () => {
        try {
            const response = await fetch(
                `/api/v1/pages/${pageId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Notion-Version': '2021-08-16',
                        Authorization: `Bearer ${notion.secret}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const pageData = await response.json();
            console.log("페이지 로드 성공:", pageData);
            setPage(pageData);
        } catch (error) {
            console.error("페이지 로드 실패:", error);
        }
    };

    useEffect(() => {
        fetchPage();
    }, [pageId]);

    if (!page) {
        return <div>Loading...</div>;
    }

    const { properties } = page;

    return (
        <div>
            <h1>{properties?.Name?.title?.[0]?.plain_text || "No Title"}</h1>
            {Object.keys(page).length > 0 && properties?.Content?.rich_text ? (
                <NotionRenderer blockMap={page} fullPage={true} />
            ) : (
                <div>No content available.</div>
            )}
        </div>
    );
};

export default Detail;
