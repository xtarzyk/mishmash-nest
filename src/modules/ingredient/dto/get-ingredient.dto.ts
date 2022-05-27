import { IsInt } from "class-validator";

export class GetIngredientDto {
    @IsInt()
    readonly id: number
}
