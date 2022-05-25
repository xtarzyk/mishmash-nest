import { Controller, Delete, Get, Param } from '@nestjs/common';
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

    @Delete('/:id')
    removeRecipe(@Param('id') id: number) {
        return this.recipeService.remove(id)
    }
}
