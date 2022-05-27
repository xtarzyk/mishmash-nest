import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { EditIngredientDto } from './dto/edit-ingredient.dto'
import { GetIngredientNameDto } from './dto/get-ingredient-name.dto'
import { GetIngredientDto } from './dto/get-ingredient.dto'
import { IngredientService } from './ingredient.service'

@Controller('ingredient')
export class IngredientController {
    constructor(private ingredientService: IngredientService) {}

    @Get()
    getAllIngredients() {
        return this.ingredientService.findAll()
    }

    @Get('by-id')
    getIngredient(@Query() dto: GetIngredientDto) {
        console.log('by-id')
        return this.ingredientService.findOneById(dto.id)
    }

    @Get('name')
    getIngredientByName(@Query() dto: GetIngredientNameDto) {
        console.log('by-name')
        return this.ingredientService.findOneByName(dto.name)
    }

    @Post()
    addIngredient(@Body() body: CreateIngredientDto) {
        return this.ingredientService.add(body.name)
    }

    @Patch()
    editIngredient(@Body() body: EditIngredientDto) {
        return this.ingredientService.edit(body.id, body.name)
    }

    @Delete()
    removeIngredient(@Body() body: GetIngredientDto) {
        return this.ingredientService.remove(body.id)
    }
}
