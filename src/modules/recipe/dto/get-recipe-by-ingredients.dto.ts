import { IsNumber } from "class-validator";

export class GetRecipeByIngredientsDto {
    @IsNumber()
    id: number
}