import { createContext, useState } from "react";

export const inputContext = createContext(null);

export const InputContextProvider = ({ children }) => {
    const [inputFontSize, setInputFontSize] = useState(16);
    const [inputFontColor, setInputFontColor] = useState("#000000");
    const [inputBgColor, setInputBgColor] = useState("#ffffff");
    const [selectFontFamily, setSelectFontFamily] = useState("Arial");

    return (
        <inputContext.Provider value={{
            inputFontSize,
            inputFontColor,
            inputBgColor,
            selectFontFamily,
            setInputFontSize,
            setInputFontColor,
            setInputBgColor,
            setSelectFontFamily,
        }}>
            {children}
        </inputContext.Provider>
    );
};