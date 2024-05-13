import { createContext, useContext, useState } from "react";

export const scrollContext = createContext();
export const useScroll = () => useContext(scrollContext);

function App() {
  const [action, setAction] = useState("Sign Up");

  return (
    <scrollContext.Provider value={{ action, setAction }}>
      <div>Homepage</div>
    </scrollContext.Provider>
  );
}

export default App;
