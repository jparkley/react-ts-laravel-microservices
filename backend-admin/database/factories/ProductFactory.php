<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        //'title' => $faker->text(20), <- version 7..
        return [            
            'title' => $this->faker->text(20),
            'description' => $this->faker->text,
            'image' => $this->faker->imageUrl(),
            'price' => $this->faker->numberBetween(10,100)
        ];
    }
}
