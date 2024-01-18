import React, {useRef} from 'react';
import cl from './MainModal.module.css'
import {findAllByDisplayValue} from "@testing-library/react";

const MainModal = ({children}) => {
    return (
       <div className={cl.MainModal}>
            <div className={cl.MainModalContent}>
                {children}
            </div>
        </div>
    );
};

export default MainModal;