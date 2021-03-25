/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMeal = /* GraphQL */ `
  query GetMeal($id: ID!) {
    getMeal(id: $id) {
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
export const listMeals = /* GraphQL */ `
  query ListMeals(
    $filter: ModelMealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        time
        dayID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFood = /* GraphQL */ `
  query GetFood($id: ID!) {
    getFood(id: $id) {
      id
      foodTypeID
      amount
      mealID
      createdAt
      updatedAt
    }
  }
`;
export const listFoods = /* GraphQL */ `
  query ListFoods(
    $filter: ModelFoodFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoods(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        foodTypeID
        amount
        mealID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDay = /* GraphQL */ `
  query GetDay($id: ID!) {
    getDay(id: $id) {
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
export const listDays = /* GraphQL */ `
  query ListDays(
    $filter: ModelDayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        personID
        date
        mealCount
        foodTotal
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPerson = /* GraphQL */ `
  query GetPerson($id: ID!) {
    getPerson(id: $id) {
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
export const listPersons = /* GraphQL */ `
  query ListPersons(
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFoodType = /* GraphQL */ `
  query GetFoodType($id: ID!) {
    getFoodType(id: $id) {
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
export const listFoodTypes = /* GraphQL */ `
  query ListFoodTypes(
    $filter: ModelFoodTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        foodCategoryID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFoodCategory = /* GraphQL */ `
  query GetFoodCategory($id: ID!) {
    getFoodCategory(id: $id) {
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
export const listFoodCategorys = /* GraphQL */ `
  query ListFoodCategorys(
    $filter: ModelFoodCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        icon
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
