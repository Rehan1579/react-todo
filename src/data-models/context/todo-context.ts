import { createContext } from "react";



export interface ITodoListContext {
    Provider?: React.Provider<ITodoListContext>;
    removeTodo(id: string): void;
    toggleTodo(id: string, completed: boolean): void;
}



export const TodoContextController = (() => {

    let context: React.Context<ITodoListContext> | undefined;



    function initializeContext() {
        return createContext(undefined);
    }



    function getContext() {

        if (!context)
        {
            context = initializeContext();
        }
        return context;
    }


    return {
        getContext,
    };
})();
