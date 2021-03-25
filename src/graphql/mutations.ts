/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMeal = /* GraphQL */ `
  mutation CreateMeal(
    $input: CreateMealInput!
    $condition: ModelMealConditionInput
  ) {
    createMeal(input: $input, condition: $condition) {
      id
      time
      dayID
      createdAt
      updatedAt
      Foods {
        nextToken
      }
    }
  }
`;
export const updateMeal = /* GraphQL */ `
  mutation UpdateMeal(
    $input: UpdateMealInput!
    $condition: ModelMealConditionInput
  ) {
    updateMeal(input: $input, condition: $condition) {
      id
      time
      dayID
      createdAt
      updatedAt
      Foods {
        nextToken
      }
    }
  }
`;
export const deleteMeal = /* GraphQL */ `
  mutation DeleteMeal(
    $input: DeleteMealInput!
    $condition: ModelMealConditionInput
  ) {
    deleteMeal(input: $input, condition: $condition) {
      id
      time
      dayID
      createdAt
      updatedAt
      Foods {
        nextToken
      }
    }
  }
`;
export const createFood = /* GraphQL */ `
  mutation CreateFood(
    $input: CreateFoodInput!
    $condition: ModelFoodConditionInput
  ) {
    createFood(input: $input, condition: $condition) {
      id
      foodTypeID
      amount
      mealID
      createdAt
      updatedAt
    }
  }
`;
export const updateFood = /* GraphQL */ `
  mutation UpdateFood(
    $input: UpdateFoodInput!
    $condition: ModelFoodConditionInput
  ) {
    updateFood(input: $input, condition: $condition) {
      id
      foodTypeID
      amount
      mealID
      createdAt
      updatedAt
    }
  }
`;
export const deleteFood = /* GraphQL */ `
  mutation DeleteFood(
    $input: DeleteFoodInput!
    $condition: ModelFoodConditionInput
  ) {
    deleteFood(input: $input, condition: $condition) {
      id
      foodTypeID
      amount
      mealID
      createdAt
      updatedAt
    }
  }
`;
export const createDay = /* GraphQL */ `
  mutation CreateDay(
    $input: CreateDayInput!
    $condition: ModelDayConditionInput
  ) {
    createDay(input: $input, condition: $condition) {
      id
      personID
      date
      sleep {
        id
        start
        end
        length
      }
      mealCount
      foodTotal
      supplements {
        name
      }
      createdAt
      updatedAt
      Meals {
        nextToken
      }
    }
  }
`;
export const updateDay = /* GraphQL */ `
  mutation UpdateDay(
    $input: UpdateDayInput!
    $condition: ModelDayConditionInput
  ) {
    updateDay(input: $input, condition: $condition) {
      id
      personID
      date
      sleep {
        id
        start
        end
        length
      }
      mealCount
      foodTotal
      supplements {
        name
      }
      createdAt
      updatedAt
      Meals {
        nextToken
      }
    }
  }
`;
export const deleteDay = /* GraphQL */ `
  mutation DeleteDay(
    $input: DeleteDayInput!
    $condition: ModelDayConditionInput
  ) {
    deleteDay(input: $input, condition: $condition) {
      id
      personID
      date
      sleep {
        id
        start
        end
        length
      }
      mealCount
      foodTotal
      supplements {
        name
      }
      createdAt
      updatedAt
      Meals {
        nextToken
      }
    }
  }
`;
export const createPerson = /* GraphQL */ `
  mutation CreatePerson(
    $input: CreatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    createPerson(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      Days {
        nextToken
      }
    }
  }
`;
export const updatePerson = /* GraphQL */ `
  mutation UpdatePerson(
    $input: UpdatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    updatePerson(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      Days {
        nextToken
      }
    }
  }
`;
export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
    $input: DeletePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    deletePerson(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      Days {
        nextToken
      }
    }
  }
`;
export const createFoodType = /* GraphQL */ `
  mutation CreateFoodType(
    $input: CreateFoodTypeInput!
    $condition: ModelFoodTypeConditionInput
  ) {
    createFoodType(input: $input, condition: $condition) {
      id
      name
      foodCategoryID
      createdAt
      updatedAt
      Foods {
        nextToken
      }
    }
  }
`;
export const updateFoodType = /* GraphQL */ `
  mutation UpdateFoodType(
    $input: UpdateFoodTypeInput!
    $condition: ModelFoodTypeConditionInput
  ) {
    updateFoodType(input: $input, condition: $condition) {
      id
      name
      foodCategoryID
      createdAt
      updatedAt
      Foods {
        nextToken
      }
    }
  }
`;
export const deleteFoodType = /* GraphQL */ `
  mutation DeleteFoodType(
    $input: DeleteFoodTypeInput!
    $condition: ModelFoodTypeConditionInput
  ) {
    deleteFoodType(input: $input, condition: $condition) {
      id
      name
      foodCategoryID
      createdAt
      updatedAt
      Foods {
        nextToken
      }
    }
  }
`;
export const createFoodCategory = /* GraphQL */ `
  mutation CreateFoodCategory(
    $input: CreateFoodCategoryInput!
    $condition: ModelFoodCategoryConditionInput
  ) {
    createFoodCategory(input: $input, condition: $condition) {
      id
      name
      icon
      createdAt
      updatedAt
      FoodTypes {
        nextToken
      }
    }
  }
`;
export const updateFoodCategory = /* GraphQL */ `
  mutation UpdateFoodCategory(
    $input: UpdateFoodCategoryInput!
    $condition: ModelFoodCategoryConditionInput
  ) {
    updateFoodCategory(input: $input, condition: $condition) {
      id
      name
      icon
      createdAt
      updatedAt
      FoodTypes {
        nextToken
      }
    }
  }
`;
export const deleteFoodCategory = /* GraphQL */ `
  mutation DeleteFoodCategory(
    $input: DeleteFoodCategoryInput!
    $condition: ModelFoodCategoryConditionInput
  ) {
    deleteFoodCategory(input: $input, condition: $condition) {
      id
      name
      icon
      createdAt
      updatedAt
      FoodTypes {
        nextToken
      }
    }
  }
`;
