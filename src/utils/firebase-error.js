export const firebaseError = (message = 'Something went wrong!') => {
    return message
        .slice(message.indexOf("/") + 1, message.lastIndexOf(")"))
        .replaceAll("-", " ")
        .toLowerCase()
}