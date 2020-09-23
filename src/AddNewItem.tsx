import React, {useState} from "react"
import { AddItemButton } from "./styles"
import { NewItemForm } from "./NewItemForm"

interface AddNewItemProps {
    onAdd(text: string): void;
    toggleButtonText: string;
    dark?: boolean;
}

export const AddNewItem = (props: AddNewItemProps) => {
    const [showForm, setShowForm] = useState(false);
    const { onAdd, toggleButtonText, dark } = props; // wtf is up with this reassignment? Using props.* is fine

    // I just put everything in one ternary evaluation because the book's suggestion of an if block before the final return wasn't very nice. 
    return (
        showForm ? 
        <NewItemForm
            onAdd={ text => {
                onAdd(text)
                setShowForm(false)
            }}
        />
        :
        <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    )
}