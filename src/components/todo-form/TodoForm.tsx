import { FormEvent, forwardRef, useImperativeHandle, useState } from "react";
import { ITodo } from "../../data-models/ITodo";

export const TodoForm = forwardRef((props: any, ref) => {
    const {saveTodo} = props;
    const [title, setTitle] = useState<string>("");



    function resetForm(): void {
        setTitle("");
    }



    function submitForm(e: FormEvent<HTMLFormElement>): void {

        e.preventDefault();
        if(!title.trim())
        {
            return;
        }


        const newTodo: ITodo = {
            title: title,
            complete: false,
        };


        saveTodo(newTodo);
    }



    useImperativeHandle(ref, () => ({
        resetForm: resetForm
    }));
    


    return (
        <form onSubmit={submitForm}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" required value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <button type="submit" disabled={!title}>Add</button>
        </form>
    );
});
