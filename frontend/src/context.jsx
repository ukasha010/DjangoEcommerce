import { createContext, useContext, useState } from "react";

const Context = createContext({});

export const DataProvider = ({ children }) => {

    const [images, setImages] = useState([]);

  return (
    <Context.Provider
      value={{
        images,
        setImages,
        
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
