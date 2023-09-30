const ErrorMessage = (props) => {
    return (
        <div className={`bg-dark text-danger ${props.className}`}>
            <h3>{props.error}</h3>
        </div>
    )
}

export default ErrorMessage;