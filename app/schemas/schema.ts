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