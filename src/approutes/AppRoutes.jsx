import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import About from '../pages/About';
import Community from '../pages/Community';
import Gallery from '../pages/Gallery';
import Join from '../pages/Join';
import Login from '../pages/Login';
import Notification from '../pages/Notification';
import Recruit from '../pages/Recruit';
import Management from '../pages/Management';
import Mypage from '../pages/Mypage';
import Join2 from '../pages/Join2';
import FindPassword from '../pages/FindPassword';
import ReviseMemInfo from '../pages/ReviseMemInfo';
import ReviseMemInfo2 from '../pages/ReviseMemInfo2';
import StudyMainPage from '../pages/StudyMainPage';
import GalleryDetail from '../pages/GalleryDetail';
import Project from '../pages/Project';
import SectionOpen from '../pages/SectionOpen';
import StudyOpen from '../pages/StudyOpen';
import ProjectOpen from '../pages/ProjectOpen';
import NotiContent from '../pages/NotiContent';
import NotiWrite from '../pages/NotiWrite';
import CommunityContent from '../pages/CommunityContent';
import CommunityWrite from '../pages/CommunityWrite';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/about' element={<About />} />
            <Route path='/community' element={<Community />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/galleryDetail/:id' element={<GalleryDetail/>}/>
            <Route path='/join' element={<Join />} />
            <Route path='/join2' element={<Join2/>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/recruit' element={<Recruit />} />
            <Route path='/management' element={<Management />} />
            <Route path = '/mypage' element={<Mypage/>}/>
            <Route path='/findpassword' element={<FindPassword/>}/>
            <Route path='/revisememberinfo' element={<ReviseMemInfo/>}/>
            <Route path='/revisememberinfo2' element={<ReviseMemInfo2/>}/>
            <Route path='/studymain' element={<StudyMainPage/>}/>
            <Route path='/project' element={<Project/>}/>
            <Route path='/sectionopen' element={<SectionOpen/>}/>
            <Route path='/studyopen' element={<StudyOpen/>}/>
            <Route path='/projectopen' element={<ProjectOpen/>}/>
            <Route path='/noticontent' element={<NotiContent/>}/>
            <Route path='/notiwrite' element={<NotiWrite/>}/>
            <Route path='/write' element={<CommunityWrite/>}/>
            <Route path='/content' element={<CommunityContent/>}/>
        </Routes>
    );
};

export default AppRoutes;
