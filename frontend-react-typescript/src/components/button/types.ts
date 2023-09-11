export type MyButtonProps = {
    btnClassName: string, 
    buttonText: string, 
    onHandleClick: () => void,
    isLoading?: boolean, 
    loadingText?: string, 
    showLoader?: boolean
}

export type LoadinButtonProps = {
    buttonText: string, 
    showLoader: boolean
}