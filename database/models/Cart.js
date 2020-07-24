module.exports = function (sequelize, dataTypes) {
    let alias = "Cart";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        state: {
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
        tableName: "carts",
        timestamps: false
    }
    
    let Cart = sequelize.define(alias, cols, config);
    
    Cart.associate = function (models){
        
        //REVISAR RELACION USUARIO CARRITO
        Cart.belongsTo(models.User,{
            as: "User",
            foreignKey: "user_id",
            timestamps: false
            
        });

        Cart.belongsToMany(models.Product,{
            as: "Products",
            through: "cart_product",
            foreignKey: "cart_id",
            otherKey: "product_id",
            timestamps: false
        })
        
    }
    
    return Cart;
}