// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { marked } from 'marked'; // marked 라이브러리 import
// import { notion } from '../config';

// // 이미지 블록 처리 함수 추가
// const renderer = new marked.Renderer();
// renderer.image = function (href, title, text) {
//     return `<img src="${href}" alt="${text}" title="${title}" style="max-width: 100%;" />`;
// };

// export default function ReactNotion({ pageId }) {
//     const [blockMap, setBlockMap] = useState({});
//     const [htmlContent, setHtmlContent] = useState('');

//     useEffect(() => {
//         const fetchBlocks = async () => {
//             try {
//                 const response = await axios.get(
//                     `/api/v1/blocks/${pageId}/children`,
//                     {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Notion-Version': '2021-08-16',
//                             Authorization: `Bearer ${notion.secret}`,
//                         },
//                     }
//                 );

//                 if (response.status !== 200) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const { results } = response.data;
//                 console.log("블록 데이터 통신 성공:", results);

//                 // blockMap에 노션 블록 데이터 저장
//                 const blocks = {};
//                 results.forEach(block => {
//                     blocks[block.id] = block;
//                 });

//                 setBlockMap(blocks);
//             } catch (error) {
//                 console.error("블록 데이터 통신 실패:", error);
//             }
//         };

//         fetchBlocks();
//     }, [pageId]);

//     useEffect(() => {
//         // blockMap이 업데이트될 때마다 HTML로 변환
//         const convertToHtml = () => {
//             let markdownContent = '';

//             Object.keys(blockMap).forEach(blockId => {
//                 const block = blockMap[blockId];

//                 if (block.type === 'paragraph' && block.paragraph && block.paragraph.text && block.paragraph.text[0] && block.paragraph.text[0].text) {
//                     markdownContent += block.paragraph.text[0].text.content + '\n';
//                 } else if (block.type === 'heading_1' && block.heading_1 && block.heading_1.text && block.heading_1.text[0] && block.heading_1.text[0].text) {
//                     markdownContent += '# ' + block.heading_1.text[0].text.content + '\n';
//                 } else if (block.type === 'heading_2' && block.heading_2 && block.heading_2.text && block.heading_2.text[0] && block.heading_2.text[0].text) {
//                     markdownContent += '## ' + block.heading_2.text[0].text.content + '\n';
//                 } else if (block.type === 'heading_3' && block.heading_3 && block.heading_3.text && block.heading_3.text[0] && block.heading_3.text[0].text) {
//                     markdownContent += '### ' + block.heading_3.text[0].text.content + '\n';
//                 } else if (block.type === 'bulleted_list_item' && block.bulleted_list_item && block.bulleted_list_item.text && block.bulleted_list_item.text[0] && block.bulleted_list_item.text[0].text) {
//                     markdownContent += '- ' + block.bulleted_list_item.text[0].text.content + '\n';
//                 } else if (block.type === 'numbered_list_item' && block.numbered_list_item && block.numbered_list_item.text && block.numbered_list_item.text[0] && block.numbered_list_item.text[0].text) {
//                     markdownContent += '1. ' + block.numbered_list_item.text[0].text.content + '\n';
//                 } else if (block.type === 'bookmark' && block.bookmark && block.bookmark.url) {
//                     markdownContent += `[${block.bookmark.url}](${block.bookmark.url})\n`;
//                 } else if (block.type === 'image' && block.image && block.image.source) {
//                     markdownContent += `![Notion Image](${block.image.source})\n`;
//                 }
//             });

//             // 마크다운을 HTML로 변환
//             const html = marked(markdownContent, { renderer });
//             setHtmlContent(html);
//         };

//         convertToHtml();
//     }, [blockMap]);

//     return (
//         <div>
//             {htmlContent ? (
//                 <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//             ) : (
//                 <div>Loading...</div>
//             )}
//         </div>
//     );
// }


//노션 데이터를 마크다운으로 변환


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { notion } from '../config';

// export default function ReactNotion({ pageId }) {
//     const [blockMap, setBlockMap] = useState({});

//     useEffect(() => {
//         const fetchBlocks = async () => {
//             try {
//                 const response = await axios.get(
//                     `/api/v1/blocks/${pageId}/children`,
//                     {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Notion-Version': '2021-08-16',
//                             Authorization: `Bearer ${notion.secret}`,
//                         },
//                     }
//                 );

//                 if (response.status !== 200) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const { results } = response.data;
//                 console.log("블록 데이터 통신 성공:", results);

//                 // 변환된 blockMap 생성
//                 const blocks = {};
//                 results.forEach(block => {
//                     blocks[block.id] = block;
//                 });

//                 setBlockMap(blocks);
//             } catch (error) {
//                 console.error("블록 데이터 통신 실패:", error);
//             }
//         };

//         fetchBlocks();
//     }, [pageId]);

//     return (
//         Object.keys(blockMap).length > 0 ? (
//             <div>
//                 {Object.keys(blockMap).map(blockId => {
//                     const block = blockMap[blockId];

//                     if (block.type === 'heading_3' && block.heading_3 && block.heading_3.text && block.heading_3.text[0] && block.heading_3.text[0].text) {
//                         return (
//                             <div key={blockId}>
//                                 <h3>{block.heading_3.text[0].text.content}</h3>
//                             </div>
//                         );
//                     } else if (block.type === 'bulleted_list_item' && block.bulleted_list_item && block.bulleted_list_item.text && block.bulleted_list_item.text[0] && block.bulleted_list_item.text[0].text) {
//                         return (
//                             <div key={blockId}>
//                                 <p>{block.bulleted_list_item.text[0].text.content}</p>
//                                 {block.bulleted_list_item.text[2] && block.bulleted_list_item.text[2].text &&
//                                     <p style={{ fontWeight: 'bold', color: 'orange' }}>{block.bulleted_list_item.text[2].text.content}</p>
//                                 }
//                             </div>
//                         );
//                     } else if (block.type === 'bookmark' && block.bookmark && block.bookmark.url) {
//                         return (
//                             <div key={blockId}>
//                                 <p><a href={block.bookmark.url} target="_blank" rel="noopener noreferrer">{block.bookmark.url}</a></p>
//                             </div>
//                         );
//                     } else if (block.type === 'image' && block.image && block.image.source) {
//                         return (
//                             <div key={blockId}>
//                                 <img src={block.image.source} alt="Notion Image" />
//                             </div>
//                         );
//                     }

//                     return null; // 다른 타입의 블록은 여기에 추가 처리 필요
//                 })}
//             </div>
//         ) : (
//             <div>Loading...</div>
//         )
//     );
// }

//노션 데이터 바인딩으로 출력하기

import { useState, useEffect } from 'react';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { NotionRenderer } from 'react-notion';
import axios from 'axios';


export default function ReactNotion({ pageId }) {
    const [response, setResponse] = useState({});

    useEffect(() => {
        const NOTION_PAGE_ID = pageId.replace(/-/g, '')
        axios
            .get(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
            .then(({ data }) => {
                setResponse(data);
            });
    }, []);

    return (
        Object.keys(response).length && (
            <NotionRenderer blockMap={response} fullPage={true} />
        )
    );

}

// 노션 그대로 임베드 하기 