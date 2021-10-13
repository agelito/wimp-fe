import { ReadIntelDto } from "./ReadIntelDto";

export type ReadPictureDto = {
    since_time: string,
    generated_time: string,
    reported_intel: ReadIntelDto[],
    reported_characters: number[],
    reported_ships: number[],
};