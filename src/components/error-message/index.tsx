import './index.scss';

const hideMessage = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
        element.style.display = 'none'
    }
}

const ErrorMessage = ({ message }: { message: string }) => {
    const id = new Date().getTime().toString()
    setTimeout(() => hideMessage(id), 5000)
    return (
        <>
            {
                message && (
                    <p
                        className="error-message"
                        id={id}
                    >{message}</p>
                )}
        </>
    )
}

export default ErrorMessage