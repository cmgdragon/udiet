import { DataTypes } from 'sequelize';
import connection from '../database';
import bcrypt from 'bcrypt';

const Diet = connection.define('diets', {

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dietData: {
    type: DataTypes.JSON
  },
  email: {
    type: DataTypes.STRING
  }

});
  
Diet.beforeCreate(async diet => {

  /*try {
      const hash = await bcrypt.hash(diet.password, 10);
      diet.password = hash;
      console.log("Password stored succefully");       
  } catch (error) {
      console.log("Error during encryption", error);
  }*/

});

export default Diet;