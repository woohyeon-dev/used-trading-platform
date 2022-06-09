const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        filename: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Image',
        tableName: 'images',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Image.belongsTo(db.Product, { foreignKey: 'p_id', targetKey: 'p_id' });
  }
};
