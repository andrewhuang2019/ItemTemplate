// TopBar.jsx

import React from  "react";
import "../assets/styles/TopBar.css"

import { Text } from '@chakra-ui/react';


const TopBar = () => {
    // Title changes based on the size of the viewport
    return(
        <div className="top-bar-content">
            <Text className='title' fontSize={['2rem', '2.5rem', '2.75rem', '3rem']}>
                Item Template
            </Text>
        </div>
    );
};

export default TopBar;