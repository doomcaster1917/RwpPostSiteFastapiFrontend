import React from 'react';
import '../../ParentObjcsStyles/apearingWindow.css'

const ApearingWindow = ({children}) => {


    return (
        <div className={'apearingWindow'}>
            {children}
        </div>

    );
};

export default ApearingWindow;