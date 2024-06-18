import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notion } from '../config';

export default function ReactNotion({ pageId }) {
    const [blockMap, setBlockMap] = useState({});

    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const response = await axios.get(
                    `/api/v1/blocks/${pageId}/children`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Notion-Version': '2021-08-16',
                            Authorization: `Bearer ${notion.secret}`,
                        },
                    }
                );

                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const { results } = response.data;
                console.log("블록 데이터 통신 성공:", results);

                // 변환된 blockMap 생성
                const blocks = {};
                results.forEach(block => {
                    blocks[block.id] = block;
                });

                setBlockMap(blocks);
            } catch (error) {
                console.error("블록 데이터 통신 실패:", error);
            }
        };

        fetchBlocks();
    }, [pageId]);

    return (
        Object.keys(blockMap).length > 0 ? (
            <div>
                {Object.keys(blockMap).map(blockId => {
                    const block = blockMap[blockId];

                    if (block.type === 'heading_3' && block.heading_3 && block.heading_3.text && block.heading_3.text[0] && block.heading_3.text[0].text) {
                        return (
                            <div key={blockId}>
                                <h3>{block.heading_3.text[0].text.content}</h3>
                            </div>
                        );
                    } else if (block.type === 'bulleted_list_item' && block.bulleted_list_item && block.bulleted_list_item.text && block.bulleted_list_item.text[0] && block.bulleted_list_item.text[0].text) {
                        return (
                            <div key={blockId}>
                                <p>{block.bulleted_list_item.text[0].text.content}</p>
                                {block.bulleted_list_item.text[2] && block.bulleted_list_item.text[2].text &&
                                    <p style={{ fontWeight: 'bold', color: 'orange' }}>{block.bulleted_list_item.text[2].text.content}</p>
                                }
                            </div>
                        );
                    } else if (block.type === 'bookmark' && block.bookmark && block.bookmark.url) {
                        return (
                            <div key={blockId}>
                                <p><a href={block.bookmark.url} target="_blank" rel="noopener noreferrer">{block.bookmark.url}</a></p>
                            </div>
                        );
                    } else if (block.type === 'image' && block.image && block.image.source) {
                        return (
                            <div key={blockId}>
                                <img src={block.image.source} alt="Notion Image" />
                            </div>
                        );
                    }

                    return null; // 다른 타입의 블록은 여기에 추가 처리 필요
                })}
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
}
