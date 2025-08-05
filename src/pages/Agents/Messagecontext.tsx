import { createContext, useState, useContext } from "react";

const MessageContext = createContext<any>(null);

export const MessageProvider = ({ children }: any) => {
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  return (
    <MessageContext.Provider value={{ unreadMessagesCount, setUnreadMessagesCount }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
