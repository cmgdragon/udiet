import Diet from '../models/Diet';

const getDiets = async email => {
    try {
        const dietData = await Diet.findAll({where: {email}});
        console.log(ee)
        return dietData;
    } catch (error) {
        console.log(error)
    }
}

export default getDiets;