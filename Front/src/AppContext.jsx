import { Children, createContext, useContext, useState } from "react";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [Data, addingData] = useState([]);
  const [Recruiter, isRecruiter] = useState(false);
  const [Email, changeEmail] = useState();
  return (
    <Context.Provider
      value={{
        Data: Data,
        addingData: addingData,
        Recruiter: Recruiter,
        isRecruiter: isRecruiter,
        Email: Email,
        changeEmail: changeEmail,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
