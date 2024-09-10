module.exports = (sequelize, DataTypes) => {
  // Define the InsuranceProduct model
  const InsuranceProduct = sequelize.define('InsuranceProduct', {
    productType: {
      type: DataTypes.STRING, // e.g., Motor, Health, Life
      allowNull: false
    },
    premium: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    coverage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    termsConditions: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});

  // Define associations for the InsuranceProduct model
  InsuranceProduct.associate = function(models) {
    InsuranceProduct.belongsTo(models.InsuranceCompany, {
      foreignKey: 'companyId',
      as: 'company'
    });
  };

  return InsuranceProduct;
};

