import { IsArray, IsString } from "class-validator";

export class CreateRecipeDto {
    @IsString()
    readonly name: string

    @IsArray()
    readonly ingredientIds: Array<number>
}