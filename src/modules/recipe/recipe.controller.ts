import { Body, Controller, Delete, Get, ParseArrayPipe, Post, Query } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipeByIngredientsDto } from './dto/get-recipe-by-ingredients.dto';
import { GetRecipeDto } from './dto/get-recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
    constructor(private recipeService: RecipeService) {}

    @Get()
    getAllRecipesNames() {
        return this.recipeService.findAll()
    }

    @Get('/id')
    getRecipeById(@Query() dto: GetRecipeDto) {
        return this.recipeService.findById(dto.id)
    }

    @Get('/mishmash')
    getRecipeByIngredients(
        @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) 
        ids: number[]
        ) {
        return this.recipeService.findByIngredients(ids)
    }

    @Get('/all')
    async getAllRecipes() {
        console.log('!!!')
        return await this.recipeService.findRecipes()
    }

    @Post()
    addIngredient(@Body() body: CreateRecipeDto) {
        return this.recipeService.add(body.name)
    }

    @Delete('/id')
    removeRecipe(@Query() dto: GetRecipeDto) {
        return this.recipeService.remove(dto.id)
    }
}
