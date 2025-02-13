import React, { useState, useCallback } from "react";
import styled from "styled-components";

// 스타일링
const Container = styled.div`
    text-align: center;
    padding: 10px;
    background: #f8f9fa;
    overflow: auto;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${GRID_SIZE}, ${BOX_SIZE}px);
    grid-template-rows: repeat(${GRID_SIZE}, ${BOX_SIZE}px);
    gap: 1px;
    width: 100%;
    height: 100vh;
    overflow: scroll;
    border: 1px solid #ccc;
`;

const Box = styled.div`
    width: ${BOX_SIZE}px;
    height: ${BOX_SIZE}px;
    background: ${(props) => (props.selected ? "#ffeb3b" : "#ddd")};
    border: 1px solid #ccc;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    &:hover {
        background: ${(props) => (props.selected ? "#ffeb3b" : "#bbb")};
    }
`;


const GRID_SIZE = 1000; // 1000 x 1000 = 1,000,000개의 박스
const BOX_SIZE = 20; // 박스 크기 (px)

const stationeryItems = [
    "연필", "지우개", "볼펜", "샤프", "색연필", "마커펜", "수첩", "다이어리",
    "메모지", "클립", "자", "스티커", "풀", "가위", "테이프", "도장",
    "노트", "필통", "화이트보드 마커", "형광펜", "자석", "크레파스", "펀치"
];

const Event = () => {
    const [grid, setGrid] = useState({}); // 클릭된 박스만 저장 (최적화)

    const handleClick = useCallback((index) => {
        if (grid[index] !== undefined) return; // 이미 클릭된 박스는 변경 불가

        const randomItem = stationeryItems[Math.floor(Math.random() * stationeryItems.length)];
        setGrid((prevGrid) => ({
            ...prevGrid,
            [index]: randomItem
        }));
    }, [grid]);

    return (
        <Container>
            <Grid>
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
                    <Box key={index} onClick={() => handleClick(index)} selected={grid[index]}>
                        {grid[index] || ""}
                    </Box>
                ))}
            </Grid>
        </Container>
    );
};

export default Event;

