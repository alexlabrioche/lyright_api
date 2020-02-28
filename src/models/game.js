module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    "Game",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4,
          notNull: true,
        },
      },
      code: {
        allowNull: true,
        type: DataTypes.CHAR(5),
        validate: {
          notNull: false,
        },
      },
      userId: {
        field: "user_id",
        allowNull: false,
        type: DataTypes.UUID,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
          notNull: true,
        },
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
          notNull: true,
        },
      },
    },
    {
      tablename: "games",
    },
  );

  Game.associate = (models) => {
    Game.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
  };

  return Game;
};
