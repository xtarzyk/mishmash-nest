import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipeByIngredientsDto } from './dto/get-recipe-by-ingredients.dto';
import { GetRecipeNameDto } from './dto/get-recipe-name.dto';
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
    getRecipeByIngredients(@Query() dto: GetRecipeByIngredientsDto) {
        return this.recipeService.findByIngredients(dto.ids)
    }

    @Get('/all')
    async getAllRecipes() {
        console.log('!!!')
        return await this.recipeService.findRecipe()
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
