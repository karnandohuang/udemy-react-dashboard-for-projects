import {createPortal} from "react-dom";
import {useImperativeHandle, useRef} from "react";
import Button from "./Button.jsx";

export default function Modal({children, ref, buttonCaption = 'Close'}) {
    const dialogRef = useRef()

    useImperativeHandle(ref, () => ({
        open () {
            dialogRef.current.showModal()
        }
    }))

    return createPortal(
        <dialog ref={dialogRef} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    )
}