import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { notion } from '../config';
import NotionRenderer from 'react-notion-x'; // NotionRenderer를 직접 가져옴

const Detail = () => {
    const { pageId } = useParams();
    const [blockMap, setBlockMap] = useState(null);

    const fetchPageBlocks = async () => {
        try {
            const response = await fetch(
                `/api/v1/blocks/${pageId}/children`,
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

            const blockData = await response.json();
            console.log("블록 데이터 로드 성공:", blockData);
            setBlockMap(blockData);
        } catch (error) {
            console.error("블록 데이터 로드 실패:", error);
        }
    };

    useEffect(() => {
        fetchPageBlocks();
    }, [pageId]);

    if (!blockMap) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NotionRenderer blockMap={blockMap} fullPage={true} />
        </div>
    );
};

export default Detail;
