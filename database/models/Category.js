module.exports = function(sequelize, dataTypes){
    let alias = "Category";

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
            allowNull: false
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config);
        
    Category.associate = function (models){
        Category.hasMany(models.Subcategory,{
            as: "Subcategory",
            foreignKey: "category_id",
            timestamps: "false"
        }),

        Category.hasMany(models.Product,{
            as: "Product",
            foreignKey: "category_id",
            timestamps: "false"
        })

    }
    return Category;
}


