/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMeal = /* GraphQL */ `
  subscription OnCreateMeal {
    onCreateMeal {
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
export const onUpdateMeal = /* GraphQL */ `
  subscription OnUpdateMeal {
    onUpdateMeal {
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
export const onDeleteMeal = /* GraphQL */ `
  subscription OnDeleteMeal {
    onDeleteMeal {
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
export const onCreateFood = /* GraphQL */ `
  subscription OnCreateFood {
    onCreateFood {
      id
      foodTypeID
      amount
      mealID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFood = /* GraphQL */ `
  subscription OnUpdateFood {
    onUpdateFood {
      id
      foodTypeID
      amount
      mealID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFood = /* GraphQL */ `
  subscription OnDeleteFood {
    onDeleteFood {
      id
      foodTypeID
      amount
      mealID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDay = /* GraphQL */ `
  subscription OnCreateDay {
    onCreateDay {
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
export const onUpdateDay = /* GraphQL */ `
  subscription OnUpdateDay {
    onUpdateDay {
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
export const onDeleteDay = /* GraphQL */ `
  subscription OnDeleteDay {
    onDeleteDay {
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
export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson {
    onCreatePerson {
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
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson {
    onUpdatePerson {
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
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson {
    onDeletePerson {
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
export const onCreateFoodType = /* GraphQL */ `
  subscription OnCreateFoodType {
    onCreateFoodType {
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
export const onUpdateFoodType = /* GraphQL */ `
  subscription OnUpdateFoodType {
    onUpdateFoodType {
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
export const onDeleteFoodType = /* GraphQL */ `
  subscription OnDeleteFoodType {
    onDeleteFoodType {
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
export const onCreateFoodCategory = /* GraphQL */ `
  subscription OnCreateFoodCategory {
    onCreateFoodCategory {
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
export const onUpdateFoodCategory = /* GraphQL */ `
  subscription OnUpdateFoodCategory {
    onUpdateFoodCategory {
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
export const onDeleteFoodCategory = /* GraphQL */ `
  subscription OnDeleteFoodCategory {
    onDeleteFoodCategory {
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
