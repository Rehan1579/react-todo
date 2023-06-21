import { FormEvent, Fragment, useState } from "react";



interface ITodo {
    id: string;
    title: string;
    complete: boolean;
    editing: boolean;
}



export function NewApp() {

    const [editOn, setEditOn] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [todos, setTodos] = useState<ITodo[]>([
        {id: "1", title: "Task 1", complete: false, editing: false},
        {id: "2", title: "Task 2", complete: false, editing: false},
        {id: "3", title: "Task 3", complete: false, editing: false},
    ]);



    function submitForm(e: FormEvent<HTMLFormElement>): void {

        e.preventDefault();
        if(editOn)
        {
            return;
        }


        let newTodo: ITodo = {
            id: crypto.randomUUID(),
            title: title,
            complete: false,
            editing: false
        };


        addTodo(newTodo);
        clearInput();
    }



    function addTodo(item: ITodo): void {
        let updatedTodos = [...todos, item];
        setTodos(updatedTodos);
    }



    function clearInput(): void {
        setTitle("");
    }



    function removeTodo(id: string): void {

        let canDelete = confirm("Are you sure you want to remove the todo?");
        if(!canDelete)
        {
            return;
        }


        let updatedTodos = todos.filter((item) => item.id !== id);
        setTodos(updatedTodos);
    }



    function editTodo(id: string, edit: boolean): void {

        let updatedTodos = todos.map((item) => {

            if(item.id === id)
            {
                if(edit)
                {
                    setTitle(item.title);  
                }


                return {
                    ...item,
                    editing: edit
                }
            }


            return item;
        });

        
        setEditOn(edit);
        console.log(updatedTodos);
        setTodos(updatedTodos);
    }



    function cancelEditing(id: string) {
        clearInput();
        editTodo(id, false);
    }



    function saveTodo(id: string, title: string) {
        updateTodo(id, "title", title);

        // clearInput();
        // setEditOn(false);

        cancelEditing(id);
    }



    function toggleTodo(id: string, completed:boolean) {
        updateTodo(id, "complete", completed);
        cancelEditing(id);
    }



    function updateTodo(id:string, key:string, value: any): void {

        let updatedTodos = todos.map((item) => {

            if(item.id === id)
            {
                return {
                    ...item,
                    editing: false,
                    [key]: value
                }
            }


            return item;
        });


        setTodos(updatedTodos);
    }



    return (
        <div>
            <form onSubmit={submitForm}>
                <label htmlFor="title">Title</label>
                <input 
                    type="text"
                    id="title"  
                    required
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                ></input>
                
                {editOn ? null : <button type="submit">Add</button>}
            </form>
            <div>
                <ol>
                    {todos.map((item) => {
                        return (
                            <li
                                key={item.id}
                                style={{textDecoration: item.complete ? 'line-through' : 'none'}}
                            >
                                
                                <label>
                                    <input type="checkbox" checked={item.complete} onChange={(e) => toggleTodo(item.id, e.target.checked)}></input>
                                    {item.title}
                                </label>


                                {
                                    item.editing
                                        ? 
                                            <>
                                                <button onClick={() => saveTodo(item.id, title)}>Save</button>
                                                <button onClick={() => cancelEditing(item.id)}>Cancel</button>
                                            </>
                                        :
                                            <Fragment key={item.id}>
                                                <button onClick={() => editTodo(item.id, true)}>Edit</button>
                                                <button onClick={() => removeTodo(item.id)}>Remove</button>
                                            </Fragment>
                                }
                            </li>
                        ) 
                    })}
                </ol> 
            </div>
        </div>
    );
}
