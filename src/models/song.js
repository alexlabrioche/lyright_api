module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
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
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [2, 100],
        },
      },
      // lyrics: {
      //   allowNull: false,
      //   type: DataTypes.ARRAY(DataTypes.STRING),
      // },
      artistId: {
        field: "artist_id",
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
      tablename: "songs",
    },
  );

  Song.associate = (models) => {
    Song.belongsTo(models.Artist, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "artist_id",
        allowNull: false,
      },
    });
  };

  return Song;
};
