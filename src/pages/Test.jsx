import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Spinner from '../components/Spinner'; // 스피너 컴포넌트 임포트

const Container = styled.div`
    width: 70%;
    height: auto;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    padding: 20px 30px;
    margin: 100px auto 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 765px) {
        width: calc(80%);
    }
`;

const Label = styled.p`
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    background: transparent;
    text-align: center;
    width: auto;
    padding: 0;
    margin:  5px 0;
`;

const Content = styled.textarea`
    width: calc(90%);
    height: auto;
    font-size: 16px;
    color: #ddd;
    line-height: 1.6;
    white-space: pre-wrap;
    background: transparent;
    border: ${(props) => (props.editable ? "1px solid #ab1a65" : "1px solid transparent")};
    border-radius: 5px;
    padding: 10px;
`;

const Input = styled.input`
    font-size: 16px;
    color: #ddd;
    background: transparent;
    border: ${(props) => (props.editable ? "1px solid #ab1a65" : "1px solid transparent")};
    border-radius: 5px;
    padding: 10px;
    &.title{
        font: bold 20px 'arial';
        color: white;
        text-align: center;
        width: 100%;
    }
    &.info{
        margin: 0;
        padding: 0 10px;
        width: auto;
        min-width: 50px;
        max-width: 100px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    background: transparent;
`;

const Button = styled.button`
    padding: 5px 15px;
    border: none;
    border-radius: 5px;
    font: bold 13px 'arial';
    cursor: pointer;
    color: white;
    background: ${(props) => (props.danger ? "#ab1a65" : "#4CAF50")};
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
        background: ${(props) => (props.danger ? "#e0004d" : "#45a049")};
    }

    &:active {
        background: ${(props) => (props.danger ? "#8b0037" : "#3d8b40")};
    }
`;

const SubWrapper = styled.div`
    background: transparent;   
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    align-self: flex-end;
`

const Test = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {};
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const localUserId = localStorage.getItem("userId");
    const [userid, setUserid] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

    
    return (
            <Container>
                <Input placeholder="test페이지" className="title"/>
                <SubWrapper className="info">
                    <Label>작성자 </Label>
                    <Input placeholder="testuser" className="info"/>
                </SubWrapper>
                <SubWrapper>
                    <Label>작성일 </Label>
                    <Input placeholder="2020.02.22" className="info"/>
                </SubWrapper>
                <Content placeholder="테스트 페이지"/>
                <ButtonWrapper>
                    <Button>삭제</Button>
                    <Button>수정</Button>
                </ButtonWrapper>
            </Container>
    );
};

export default Test;
