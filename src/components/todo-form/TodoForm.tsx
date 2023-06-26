import { FormEvent, forwardRef, useImperativeHandle, useState } from "react";
import { ITodo } from "../../data-models/interfaces/ITodo";
import "./TodoForm.scss";


interface Props {
    saveTodo(todo: ITodo): void;
}


export const TodoForm = forwardRef((props: Props, ref) => {

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
            <div className="form-input">
                <input placeholder="Add Your Todo" type="text" id="title" required value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <button type="submit" disabled={!title}>Add</button>
            </div>
        </form>
    );
});
