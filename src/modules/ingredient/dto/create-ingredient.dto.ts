import { IsString } from "class-validator"

export class CreateIngredientDto {
    @IsString()
    readonly name: string
}