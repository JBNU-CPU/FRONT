import styled from 'styled-components';
import { LuConstruction } from "react-icons/lu";
import Header from "../components/Header";

const Wrapper = styled.div`
    width: calc(100%);
    height: calc(100vh-60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    margin-top: 30px;
`

const Icon = styled(LuConstruction)`
    color: white;
    width: calc(30%);
    height: auto;
`

const Text = styled.p`
    color: white;
    font: bold 30px 'airal';
    margin: 0;
    margin-block: 20px;
`

const Recruit = () => {
    return(
        <>
            <Header/>
            <Wrapper>
                <Icon/>
                <Text>잠시 공사중 !</Text>
                <Text>모집은 구글폼으로 진행합니다!</Text>
            </Wrapper>
        </>
    );
};

export default Recruit;