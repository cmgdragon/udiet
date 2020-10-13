import React, {useContext, useEffect, useState} from 'react';
import styles from '../ViewDiet/Diet.module.css';
import { signOut } from '../../Services/authProviders';
import { getUserDiets, getDietSharedUsers } from '../../Database/readDietInfo';
import { UserContext } from '../../Context/userContext';
import { Link } from 'react-router-dom';
import { addNewUserDiet, modifyCouseMealImageInfo, modifyDietSharedUsers } from '../../Database/writeDietInfo';
import { deleteUserDiet } from '../../Database/deleteDietInfo';
import { DietUsersModal } from '../DietModal';
import modalStyles from '../DietModal/DietModal.module.css';
import Header from '../Header';

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
    const [sharedUsersDiet, setSharedUsersDiet] = useState(undefined);
    const [modalShown, setModalShown] = useState(false);
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

    const closeSharedUsersModal = () => setModalShown(false);

    const showSharedUsersModal = async dietId => {
        const sharedUsers = await getDietSharedUsers(user.uid, dietId);
        setSharedUsersDiet(sharedUsers);
        setModalShown(true);
    }

    const addNewSharedUserDiet = async (userId, dietId) => {
        const dialog = window.prompt("Introduce el email del usuario con el que quieres compartir esta dieta");

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (dialog && emailRegex.test(dialog)) {
            const newList = sharedUsersDiet ? Object.values(sharedUsersDiet) : [];
            newList.push(dialog);
            await modifyDietSharedUsers(userId, dietId, newList);
            const modalBoxEl = document.createElement('div');
            const modalItemEl = document.createElement('div');
            const modalDeleteEl = document.createElement('i');
            modalBoxEl.classList = [`${modalStyles['modal-users-list']}`];
            modalItemEl.classList = [`${modalStyles['modal-user-list-item']}`];
            modalItemEl.innerText = dialog;
            modalDeleteEl.classList = [`fa fa-trash ${modalStyles['remove-user']}`];
            modalDeleteEl.addEventListener('click', event => removeSharedUserDiet(event, user.uid, dietId));
            modalBoxEl.appendChild(modalItemEl);
            modalBoxEl.appendChild(modalDeleteEl);
            console.log(`.${modalStyles['modal-users-list']}`);
            document.querySelector(`.${modalStyles['modal-users']}`).appendChild(modalBoxEl);

        } else {
            alert('Email inválido')
        }

    }

    const removeSharedUserDiet = async (event, userId, dietId) => {

        const email = event.target.previousElementSibling.innerText;
        const currenItem = event.target.parentElement;
        if (window.confirm(`¿Quieres eliminar a ${email} de la lista de editores?`)) {
            const newList = sharedUsersDiet ? Object.values(sharedUsersDiet) : [];
            const userIndex = newList.findIndex(u => u === email);
            newList.splice(userIndex, 1);
            await modifyDietSharedUsers(userId, dietId, newList);
            currenItem.remove();
        }

    }

    return (
        <>
            <Header user={user} signOut={signOut}/>
            <div className={styles.cuerpo}>

                    <Link to={'/create'} id="create-diet" className={styles['create-diet']} >Crear una nueva dieta</Link>
                    <div className={styles['my-diets-label']}>Mis dietas</div>
                    <div className={styles['my-diets-label-border-bottom']}></div>
                   {
                    Object.values(dietUserList).map((diet, dietId) => {
                        return (
                            <React.Fragment key={dietId}>
                                <DietUsersModal 
                                    shown={modalShown}
                                    closeModal={closeSharedUsersModal}
                                    sharedUsersDiet={sharedUsersDiet}
                                    promptModal={() => addNewSharedUserDiet(user.uid, dietId)}
                                    removeUser={event => removeSharedUserDiet(event, user.uid, dietId)}
                                />
                                {
                                    <div className={styles['diet-list']}>
                                        <Link to={`/${user.uid}/${dietId}`}
                                            className={styles['diet-list-item']} >
                                                {diet.dietName}
                                        </Link>
                                        <div className={styles['diet-item-buttons']}>
                                            <i className={`fa fa-user ${styles['share-diet']}`}
                                            aria-hidden="true"
                                            onClick={() => showSharedUsersModal(dietId)} ></i>
                                            <i className={`fa fa-trash ${styles['remove-diet']}`}
                                            aria-hidden="true"
                                            onClick={(event) => removeDiet(event, dietId)} ></i>
                                         </div>
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