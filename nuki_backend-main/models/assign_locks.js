import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../lib/db_pool.js";

const LockAssignments = sequelize.define(
  "lock_assignments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },

    resource_id: {
      type: DataTypes.STRING,
      allowNull: true
    },

    lock_id: {
      type: DataTypes.STRING,
      allowNull: true
    },

    unlock_type: {
      type: DataTypes.STRING,
      allowNull: true
    },

    lock_name: {
      type: DataTypes.STRING,
      allowNull: true
    }



  },
  {
    /**
         * Other model options go here
         */
  }
);

export default LockAssignments;