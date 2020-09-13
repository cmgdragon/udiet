import { DataTypes } from 'sequelize';
import connection from '../database';

const Diet = connection.define('diets', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });
  
  // `sequelize.define` also returns the model
  //console.log(Diet === connection.models.Diet); // true

  export default Diet;