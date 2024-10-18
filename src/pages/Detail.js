import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { notion } from '../config';
import Notion from "../components/Notion";

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
                    body: JSON.stringify({ databaseId: `${notion.databaseId}` }),
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
            <Notion pageId={pageId} />
        </div>
    );
};

export default Detail;
