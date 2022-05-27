import { IsInt } from "class-validator";

export class GetRecipeDto {
    @IsInt()
    readonly id: number
}