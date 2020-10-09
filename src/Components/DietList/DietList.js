import React, {useContext, useEffect, useState} from 'react';
import styles from '../ViewDiet/Diet.module.css';
import { signOut } from '../../Services/authProviders';
import { getUserDiets } from '../../Database/readDietInfo';
import { UserContext } from '../../Context/userContext';
import { Link } from 'react-router-dom';
import { addNewUserDiet, modifyCouseMealImageInfo, deleteUserDiet } from '../../Database/writeDietInfo';

const dietObjectDB = {
    isPrivate: false,
    dietName: "testets",
    sharedWith: ['cmgdragon@uoc.edu'],
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
    const userContext = useContext(UserContext);

    const user = userContext;

    const backToHome = () => {
        window.location.href = '/';
    }

    const removeDiet = (event, dietId) => {
        if (window.confirm('¿Quieres borrar esta dieta?')) {
            event.target.classList = [`fas fa-spinner fa-pulse ${styles['remove-diet']}`];
            deleteUserDiet(user.uid, dietId).then(re => window.location.reload());
        }
    }

    useEffect(() => {

        getUserDiets(user.uid).then(diets => {
            if (diets) setDietUserList(diets);
        });
        
        //only for testing
        //addNewUserDiet(user.uid, dietObjectDB);
        //modifyCouseMealImageInfo(user.uid, 0);

    }, []);

    return (
        <>
            <div className={styles.userbuttons}>
                <i id="back-button" onClick={backToHome} className={`fa fa-arrow-left ${styles.goback}`} aria-hidden="true"></i>
                <button className={styles.logout} onClick={signOut}>Sign out ({user.displayName})</button>
            </div>
            <div className={styles.cuerpo}>

                    <Link to={'/create'} id="create-diet" className={styles['create-diet']} >Crear una nueva dieta</Link>
                    <div className={styles['my-diets-label']}>Mis dietas</div>
                    <div className={styles['my-diets-label-border-bottom']}></div>
                   {
                    Object.values(dietUserList).map((diet, index) => {
                        return (
                            <React.Fragment key={index}>

                                {
                                    <div className={styles['diet-list']}>
                                        <Link to={`/${user.uid}/${index}`}
                                            className={styles['diet-list-item']} >
                                                {diet.dietName}
                                        </Link>
                                        <i className={`fa fa-times ${styles['remove-diet']}`}
                                         aria-hidden="true"
                                         onClick={(event) => removeDiet(event, index)} ></i>
                                    </div>
                                }
                            </React.Fragment>
                            )
                        })
                    }

            </div>
        </>
    ) 

}

export default Diet;