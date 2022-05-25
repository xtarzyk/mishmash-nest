import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
    constructor(private recipeService: RecipeService) {}

    @Get()
    getAllRecipes() {
        return this.recipeService.findAll()
    }

    @Get('/:id')
    getRecipe(@Param('id') id: number) {
        return this.recipeService.findOne(id)
    }

    @Post()
    addIngredient(@Body() body: CreateRecipeDto) {
        return this.recipeService.add(body.name)
    }

    @Delete('/:id')
    removeRecipe(@Param('id') id: number) {
        return this.recipeService.remove(id)
    }
}
