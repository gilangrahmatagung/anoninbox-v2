export type ProfilContextSchema = {
    email: string
}

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
    is_author_box_maker: boolean
    created_at: string
    updated_at: string
}

export type MessageCreateSchema = {
    message_title?: string
    message_body: string
}

export type ThreadAndMessagesSchema = {
    id: number
    box: number
    user_email: number
    non_user_email: string
    messages: MessageSchema[]
}

export type UserSchema = {
    email: string
    password: string
}

export type ThreadCreateSchema = {
    non_user_email?: string
    
    message_title?: string
    message_body: string
}

export const baseUrl: string = "http://localhost:8000/ipa"
export const originWeb: string = "http://localhost:3000"