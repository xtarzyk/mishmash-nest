import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/lib/entities/recipe.entity';
import { RecipesIngredients } from 'src/lib/entities/recipesIngredients.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipesIngredients])],
  exports: [TypeOrmModule],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
