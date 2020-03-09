module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "Artist",
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
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [2, 100],
        },
      },
      birthName: {
        field: "birth_name",
        type: DataTypes.STRING,
        validate: {
          notNull: false,
          len: [2, 100],
        },
      },
      born: {
        type: DataTypes.STRING,
        validate: {
          notNull: false,
          len: [2, 100],
        },
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
      tableName: "artists",
    },
  );

  Artist.associate = (models) => {
    Artist.hasMany(models.Song, { foreignKey: "artist_id" });
  };

  return Artist;
};
