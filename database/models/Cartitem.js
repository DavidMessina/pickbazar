module.exports = function (sequelize, dataTypes) {
    let alias = "Cartitem";
    
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
        subtotal: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
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
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: false
        }
    }
    
    let config = {
        tableName: "cartitems",
        timestamps: false
    }
    
    let Cartitem = sequelize.define(alias, cols, config);
    
    //FALTA VERIFICAR RELACIONES
    /*Cartitem.associate = function (models){
        Cartitem.hasMany(models.Product,{
            as: "Product",
            foreignKey: "product_id",
            timestamps: false
            
        });
        
        Cartitem.belongsTo(models.Cart,{
            as: "Cart",
            foreignKey: "cart_id",
            timestamps: false
            
        })
    }*/
    
    
    return Cartitem;
}