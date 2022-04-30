import { forwardRef } from 'react'

// &nbsp; to prevent layout shift 
export const Input = forwardRef(({ error, label, ...inputProps }, ref) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {label && <label htmlFor={inputProps.id}>{label}</label>}
            <input {...inputProps} ref={ref} />
            {error ? <span style={{color: 'red'}}>{error}</span> : <span>&nbsp;</span>}
        </div>
    )
})