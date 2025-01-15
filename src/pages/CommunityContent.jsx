import React from 'react';
import { useLocation } from 'react-router-dom';

const CommunityContent = () => {
    const location = useLocation();
    const { id } = location.state || {};

    return (
        <div>
            <h1>Project Page</h1>
            <p>Project ID: {id}</p>
        </div>
    );
};

export default CommunityContent;
