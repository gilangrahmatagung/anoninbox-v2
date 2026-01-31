export type BoxSchema = {
    id: number
    box_maker: number
    box_title: string
    box_description: string
    created_at: string
    updated_at: string
}

export type BoxCreateSchema = {
    box_title: string
    box_description: string
}

export type MessageSchema = {
    id: number
    thread: number
    message_title: string
    message_body: string
    created_at: string
    updated_at: string
}

export type MessageCreateSchema = {
    message_title: string
    message_body: string
}

export type ThreadAndMessagesSchema = {
    id: number
    box: number
    user_email: number
    non_user_email: string
    messages: MessageSchema[]
}

export const baseUrl: string = "http://localhost:8000/ipa"