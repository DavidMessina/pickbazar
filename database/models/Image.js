module.exports = function(sequelize, dataTypes){
    let alias = "Image";
    
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
        main:{
            type:dataTypes.INTEGER,
            allowNull: false
        },
        product_id:{
            type:dataTypes.INTEGER,
            allowNull: false
        },
        created_at:{
            type:dataTypes.DATE,
            allowNull: true
        }
    }
    
    let config = {
        tableName: "images",
        timestamps: false
    }
    
    let Image = sequelize.define(alias, cols, config);
    
    Image.associate = function (models){
        Image.belongsTo(models.Product,{
            as: "Product",
            foreignKey: "product_id",
            timestamps: "false"
        })
     
    }
    
    return Image;
}