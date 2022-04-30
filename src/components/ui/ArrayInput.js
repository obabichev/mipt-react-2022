import { Fragment } from "react"

export const ArrayInput = ({fields, onAppendButtonClick, onRemoveButtonClick, removeButtonTitle, appendButtonTitle, children}) => {
    return (
        <>
            {fields.map((field, index) => {
                const isFirstItem = index === 0
                return (
                    <Fragment key={field.id}>
                        {children(index)}
                        {!isFirstItem && <button type="button" onClick={() => onRemoveButtonClick(index)}>{removeButtonTitle}</button>}
                    </Fragment>
                )
            })}
            <button style={{display: 'block'}} type="button" onClick={onAppendButtonClick}>{appendButtonTitle}</button>
        </>
    )
}