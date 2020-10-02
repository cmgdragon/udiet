import React, {useContext, useEffect, useState} from 'react';
import styles from './Diet.module.css';
import Meal from '../Meal';
import { auth } from '../../Services/authProviders';
import { getUserDiets } from '../../Database/readDietInfo';
import { UserContext } from '../../Context/userContext';
import CreateDiet from '../CreateDiet'
import { addNewUserDiet, modifyCouseMealImageInfo } from '../../Database/writeDietInfo';

const dietObjectDB = {
    isPrivate: false,
    dietName: "testets",
    mealData: [
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: true
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },

        {
            name: "Merienda2",
            courseMeals: [
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz2",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        },
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info",
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments",
                    hasImage: false
                }
            ]
        }

    ]
}

const Diet = props => {

    const [dietUserList, setDietUserList] = useState({});
    const [dietObject, setDietObject] = useState(undefined);
    const userContext = useContext(UserContext);

    const user = userContext ? userContext : {
        uid: props.ids.uid,
        dietId: props.ids.dietId,
        notLoggedIn: props.ids.notLoggedIn
    };

    const backToHome = () => {
        window.location.href = '/';
    }

    const isCreatePath = () => {
        return window.location.origin + '/create' === window.location.href ? true : false;
    }

    const createNewDiet = () => {
        window.location.href = window.location.origin + '/create';
    }

    useEffect(() => {

        getUserDiets(user.uid).then(diets => {
            setDietUserList(diets);

            if (user.notLoggedIn) {
                setDietObject(Object.values(dietUserList)[user.dietId]);
            }

        });
        
        //only for testing
        //addNewUserDiet(user.uid, dietObjectDB);
        //modifyCouseMealImageInfo(user.uid, 0);

    }, []);


    const signOut = async () => {
    
        try {
            await auth.signOut();
            console.log('Logged out');
            backToHome();
        } catch (error) {
            console.log(error.message)
        }
    
    }

    const selectDiet = index => {
        setDietObject({dietObject: Object.values(dietUserList)[index], dietId: index});
    }

    if (!dietUserList) return backToHome();


    return (
        <>
           { user.notLoggedIn ? undefined : <button onClick={signOut}>Sign out</button>}
            <div className={styles.cuerpo}>

                {  dietObject ? <Meal dietObject={dietObject.dietObject} 
                    dietId={dietObject.dietId} 
                    userUid={user.uid} 
                    notLoggedIn={user.notLoggedIn} /> :

                   Object.values(dietUserList)[user.dietId] &&
                   Object.values(dietUserList)[user.dietId].isPrivate ? <strong>¡Esta dieta es privada! Pírate subnormal</strong> :
                    
                   Object.values(dietUserList)[user.dietId] ? <Meal dietObject={Object.values(dietUserList)[user.dietId]} 
                    dietId={user.dietId} 
                    userUid={user.uid} 
                    notLoggedIn={user.notLoggedIn} /> :

                   isCreatePath() ? <CreateDiet /> :

                   <>
                    <div id="create-diet" className={styles['create-diet']} onClick={createNewDiet}>Crear una nueva dieta</div>
                    <div className={styles['my-diets-label']}>Mis dietas</div>
                    <div className={styles['my-diets-label-border-bottom']}></div>
                   {
                    Object.values(dietUserList).map((diet, index) => {
                        return (
                            <React.Fragment key={index}>

                                { !!user.notLoggedIn && ( user.dietId > Object.keys(dietUserList).length-1
                                    || !Number.isInteger(user.dietId) ) ? backToHome() :
                                    <div 
                                        className={styles['diet-list-item']} 
                                        onClick={() => selectDiet(index)} >
                                            {diet.dietName}
                                    </div>
                                }
                            </React.Fragment>
                            )
                        })
                    }

                    </>
                }

            </div>
        </>
    ) 

}

export default Diet;