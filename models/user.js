'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);
    static register = ({username, password}) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({username, password: encryptedPassword});
    }

    checkPassword = password => bcrypt.compareSync(password, this.password);
    /* Method ini kita pakai untuk membuat JWT */
    generateToken = () => {
      // Jangan memasukkan password ke dalam payload
      const payload = {
        id: this.id,
        username: this.username
      }
      // Rahasia ini nantinya kita pakai untuk memverifikasi apakah token ini benar-benar berasal dari aplikasi kita
      const rahasia = 'Ini rahasia ga boleh di sebar-sebar'
      // Membuat token dari data-data diatas
      const token = jwt.sign(payload, rahasia);
      return token;

    }
    /* Method Authenticate, untuk login */
    static authenticate = async ({username, password}) => {
      try {
        const user = await this.findOne({where: {username}});
        if(!user) return Promise.reject("User not Found!");
        const isPasswordValid = user.checkPassword(password);
        if(!isPasswordValid) return Promise.reject("Wrong password!");
        return Promise.resolve(user);
      } catch(err) {
        return Promise.reject(err);
      }
      /* Akhir dari semua yang berhubungan dengan login */
    }

  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};