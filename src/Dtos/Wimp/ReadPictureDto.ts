import { ReadIntelDto } from "./ReadIntelDto";

export type ReadPictureDto = {
    since_time: Date,
    generated_time: Date,
    reported_intel: ReadIntelDto[],
    reported_characters: number[],
    reported_ships: number[],
};