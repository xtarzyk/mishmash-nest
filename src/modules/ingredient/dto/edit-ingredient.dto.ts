import { IsInt, IsPositive, IsString } from "class-validator"

export class EditIngredientDto {
    @IsInt()
    @IsPositive()
    readonly id: number

    @IsString()
    readonly name: string
}