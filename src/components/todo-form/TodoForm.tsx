import { ChangeEvent, FormEvent, forwardRef, useImperativeHandle, useState } from "react";
import { ITodo } from "../../data-models/interfaces/ITodo";
import styled from 'styled-components';


interface Props {
    saveTodo(todo: ITodo): void;
}


const FormInput = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    

    input {
        padding: 4px 8px;
        height: 32px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        outline: 2px solid transparrent;

        &:focus {
            outline: 2px solid #ccc;
        }
    }


    &.invalid input {
        outline: 2px solid maroon;
    }
`;


export const TodoForm = forwardRef((props: Props, ref) => {

    const {saveTodo} = props;
    const [title, setTitle] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(true);



    function resetForm(): void {
        setTitle("");
    }



    function submitForm(e: FormEvent<HTMLFormElement>): void {

        e.preventDefault();
        if(!title.trim())
        {
            setIsValid(false);
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



    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {

        let val = event.target.value;
        if(!!val)
        {
            setIsValid(true);
        }


        setTitle(val);
    }
    


    return (
        <form onSubmit={submitForm}>
            <FormInput className={!isValid && 'invalid'}>
                <input placeholder="Add Your Todo" type="text" id="title" required value={title} onChange={onChangeTitle}></input>
                <button type="submit" disabled={!title}>Add</button>
            </FormInput>
        </form>
    );
});
