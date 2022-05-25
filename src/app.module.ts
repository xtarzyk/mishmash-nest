import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Ingredient } from './lib/entities/ingredient.entity';
import { Recipe } from './lib/entities/recipe.entity';
import { RecipesIngredients } from './lib/entities/recipesIngredients.entity';
import { IngredientModule } from './modules/ingredient';
import { RecipeModule } from './modules/recipe';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'testDb',
      entities: [Ingredient, Recipe, RecipesIngredients],
      logging: true,
      synchronize: false,
    }),
    IngredientModule,
    RecipeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
