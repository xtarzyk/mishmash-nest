import { IsString } from "class-validator";

export class GetRecipeNameDto {
    @IsString()
    readonly name: string
}