import React, {useState, KeyboardEvent, ChangeEvent} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    return (
        <div>
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : ""}
                onBlur={() => {setError(true)}}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>Title is required! </div>}
        </div>
    )
}


export default AddItemForm;
