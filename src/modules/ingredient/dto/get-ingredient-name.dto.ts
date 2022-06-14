import { IsString } from "class-validator"

export class GetIngredientNameDto {
    @IsString()
    readonly name: string
}
