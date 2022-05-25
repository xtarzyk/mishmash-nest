import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { EditIngredientDto } from './dto/edit-ingredient.dto';
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

    @Post()
    addIngredient(@Body() body: CreateIngredientDto) {
        return this.ingredientService.add(body.name)
    }

    @Patch('/:id')
    editIngredient(@Param('id') id: number, @Body() body: EditIngredientDto) {
        return this.ingredientService.edit(id, body.name)
    }

    @Delete('/:id')
    removeIngredient(@Param('id') id: number) {
        return this.ingredientService.remove(id)
    }
}
