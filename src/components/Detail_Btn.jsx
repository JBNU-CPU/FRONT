import React from 'react';
import styled from 'styled-components';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {useNavigate} from 'react-router-dom';

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #EA0079;
    border-radius: 5px;
    background: none;
    font: bold 12px 'arial';
    font-weight: 700;
    width: 70px;
    height: 30px;
    color : white;
    margin-top : 20px;
    margin-bottom : 50px;
    &:hover{
        cursor: pointer;
        color:gray;
        & > svg {
            color: gray;
        }
    }
`;

const Arrow = styled(MdOutlineArrowForwardIos)`
    margin-left: 1px;
    font-size: 12.5px;
    color : white;
`;

const Text = styled.span`
    margin-left: 4px; 
`;

const Detail_Btn = ({navigation}) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/${navigation}`); // 누르면 이동할 url주소
    }

    return (
        <Button onClick={onClick}>
            <Text>Detail</Text><Arrow />
        </Button>
    );
};

export default Detail_Btn;
