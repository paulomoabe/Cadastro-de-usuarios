import Sequelize from 'sequelize'


const conn = new Sequelize('nodesequelize2', 'root', '', {

    host: 'localhost',
    dialect: 'mysql'
})



export default conn
/*try {

    sequelize.authenticate()
    console.log('Conectamos om sucesso com o Sequelize!!');
    
} catch (err) {
    console.log('Não foi possível conectar: ', err);
}*/
