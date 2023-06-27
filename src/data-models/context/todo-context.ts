import { createContext, useContext } from "react";



export interface ITodoListContextValue {
    Provider?: React.Provider<ITodoListContextValue>;
    removeTodo(id: string): void;
    toggleTodo(id: string, completed: boolean): void;
}



export const TodoContextController = (() => {

    let context: React.Context<ITodoListContextValue> | undefined;



    function initializeContext() {
        
        console.log("Initializing Todo context...");
        return createContext(undefined);
    }



    function provideContext() {

        if (!context)
        {
            context = initializeContext();
        }
        return context;
    }


    return {
        provideContext
    };
})();



export function useTodoContext(): ITodoListContextValue {
    const contextInstance = TodoContextController.provideContext();
    const contextValue = useContext(contextInstance);
  
    if (!contextValue)
    {
      throw new Error(
        "Todo context is not available. Make sure to provide the context using TodoContextProvider."
      );
    }
  
    return contextValue;
  }
