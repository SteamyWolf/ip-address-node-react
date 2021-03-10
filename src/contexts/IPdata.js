import React, { useState, createContext } from 'react';

export const IPdataContext = createContext();

const IPdataContextProvider = (props) => {
    const [ipAddressData, setIpAddressData] = useState({})

    return (
        <IPdataContext.Provider value={{ipAddressData}}>
            {props.children}
        </IPdataContext.Provider>
    )
}

export default IPdataContextProvider;