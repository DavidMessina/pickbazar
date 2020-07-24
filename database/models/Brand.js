module.exports = function(sequelize, dataTypes){
    let alias = "Brand";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type:dataTypes.STRING,
            allowNull: false
        },
        created_at:{
            type:dataTypes.DATE,
            allowNull: true
        }
    }

    let config = {
        tableName: "brands",
        timestamps: false
    }

    let Brand = sequelize.define(alias, cols, config);
        
    Brand.associate = function (models){
        Brand.hasMany(models.Product,{
            as: "Product",
            foreignKey: "brand_id",
            timestamps: "false"
        })
    }

    return Brand;
}