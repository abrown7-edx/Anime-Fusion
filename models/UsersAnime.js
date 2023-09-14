const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const UsersAnime = sequelize.define('users_anime', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  anime_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'animes',
      key: 'id'
    }
  },
  watchlist: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Define associations for the many-to-many relationship
UsersAnime.associate = (models) => {
  models.User.belongsToMany(models.Anime, {
    through: UsersAnime,
    foreignKey: 'user_id'
  });

  models.Anime.belongsToMany(models.User, {
    through: UsersAnime,
    foreignKey: 'anime_id'
  });
};

module.exports = UsersAnime;
