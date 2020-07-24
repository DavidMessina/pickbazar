module.exports = function (sequelize, dataTypes) {
    let alias = "Cart_product";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        units: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        
        subtotal: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        
        cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        product_id: {
            type: dataTypes.INTEGER,
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
        tableName: "cart_product",
        timestamps: false
    }
    
    let Cart_product = sequelize.define(alias, cols, config);
    
    /*Cart_product.associate = function (models){
        
        Cart_product.belongsToMany(models.Product,{
            as: "Producto",
            through: "cart_product",
            foreignKey: "product_id",
            otherKey: "cart_id",
            timestamps: false
        })
    }*/
    return Cart_product;
}