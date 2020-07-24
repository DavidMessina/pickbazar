module.exports = function (sequelize, dataTypes) {
    let alias = "User";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user: {
            type: dataTypes.STRING
        },
        phone: {
            type: dataTypes.STRING,
            allowNull: false
        },
        address: {
            type: dataTypes.STRING,
            allowNull: false
        },
        userType: {
            type: dataTypes.STRING,
            allowNull: false
        },
        state: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING
        },
        country: {
            type: dataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true
        }
    }
    
    let config = {
        tableName: "users",
        timestamps: false
    }
    
    let User = sequelize.define(alias, cols, config);

    //REVISAR RELACION USUARIO CARRITO
    User.associate = function (models){
        User.hasMany(models.Cart,{
            as: "Cart",
            foreignKey: "user_id",
            timestamps: false
            
        });
    } 
    
    
    return User;
}