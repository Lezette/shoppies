import React, { useState, createContext } from 'react';

const NominationContext = createContext();

const NominationProvider = props => {
    const [nominations, setNominations] = useState(null)

    return (
        <NominationContext.Provider
            value={[nominations, setNominations]}
        >
            {props.children}
        </NominationContext.Provider>
    );
}
export { NominationContext, NominationProvider };