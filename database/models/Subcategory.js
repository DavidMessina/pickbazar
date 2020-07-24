module.exports = function(sequelize, dataTypes){
    let alias = "Subcategory";

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
        category_id:{
            type:dataTypes.INTEGER,
            allowNull: false
        },
        created_at:{
            type:dataTypes.DATE,
            allowNull: false
        },
        updated_at:{
            type:dataTypes.DATE,
            allowNull: false
        }
    }

    let config = {
        tableName: "subcategories",
        timestamps: false
    }

    let Subcategory = sequelize.define(alias, cols, config);
        
    Subcategory.associate = function (models){
        Subcategory.hasMany(models.Product,{
            as: "Product",
            foreignKey: "subcategory_id",
            timestamps: "false"
        }),

        Subcategory.belongsTo(models.Category,{
            as: "Category",
            foreignKey: "category_id",
            timestamps: "false"
        })
    }

    return Subcategory;
}