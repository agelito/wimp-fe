import { ReadUserDto } from "./ReadUserDto";

export type ReadUsersDto = {
    page: number
    per_page: number
    total: number
    total_pages: number

    users: ReadUserDto[]
}