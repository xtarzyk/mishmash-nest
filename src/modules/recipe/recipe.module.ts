import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/lib/entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  exports: [TypeOrmModule],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
