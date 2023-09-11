export type Todo = {
    _id: string, 
    title: string, 
    description: string, 
    isDone?: boolean
    isLoading?: boolean
}

export type NewTodo = {
    title: string, 
    description: string, 
    isDone?: boolean
    isLoading?: boolean
}