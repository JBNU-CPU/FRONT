const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv')

dotenv.config();

// 환경 변수 기본값 설정
const PORT = process.env.REACT_APP_PORT;
const URI = process.env.REACT_APP_URI;

// React 정적 파일 제공
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// React로 모든 요청 처리
app.get('*', (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Failed to send index.html:', err);
            res.status(500).send('Server Error');
        }
    });
});

// 서버 실행
app.listen(PORT, () => console.log(`Server is running on http://${URI}:${PORT}`));
