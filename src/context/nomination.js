import React, { useState, createContext, useEffect } from 'react';

const NominationContext = createContext();

let norminationList = {}
if(localStorage.getItem('nominations')) {
    norminationList = JSON.parse(localStorage.getItem('nominations'));
}

const NominationProvider = props => {
    const [nominations, setNominations] = useState(norminationList);

    useEffect(() => {
       localStorage.setItem('nominations', JSON.stringify(nominations));
    }, [nominations]);

    return (
        <NominationContext.Provider
            value={[nominations, setNominations]}
        >
            {props.children}
        </NominationContext.Provider>
    );
}
export { NominationContext, NominationProvider };