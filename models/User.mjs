import {DataTypes} from 'sequelize'

import db from '../db/conn.mjs'

const User = db.define('user', {
    name: {
        type: DataTypes.STRING,
        alloWNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        validate: {       
            notEmpty: true
        }  
    },
    newsletter:{
        type: DataTypes.BOOLEAN,
    }

})

export default User