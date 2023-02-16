import './index.scss'

const SubmitButton = ({ onClick, buttonText, className }: { onClick: Function, buttonText: string, className: string }) => {
    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
            className={className}
        >{buttonText}</button>
    )
}

export default SubmitButton