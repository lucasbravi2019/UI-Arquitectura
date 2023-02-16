import { useAppSelector } from '../../redux/hooks/hooks'
import { messagesSelector } from '../../redux/reducers/messageSlice'
import ErrorMessage from '../error-message'
import SuccessMessage from '../success-message'

const MessagePopup = () => {
    const messageSelector = useAppSelector(messagesSelector)

    return (
        <>
            {
                messageSelector.successMessage && (
                    <SuccessMessage
                        message={messageSelector.successMessage}
                    />
                )
            }
            {
                messageSelector.errorMessage && (
                    <ErrorMessage
                        message={messageSelector.errorMessage}
                    />
                )
            }
        </>
    )
}

export default MessagePopup