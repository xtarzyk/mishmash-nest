import { Controller, Delete, Get, Param } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
    constructor(private ingredientService: IngredientService) {}

    @Get()
    getAllIngredients() {
        return this.ingredientService.findAll()
    }

    @Get('/:id')
    getIngredient(@Param('id') id: number) {
        return this.ingredientService.findOne(id)
    }

    @Delete('/:id')
    removeIngredient(@Param('id') id: number) {
        return this.ingredientService.remove(id)
    }
}
