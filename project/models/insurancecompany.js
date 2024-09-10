module.exports = (sequelize, DataTypes) => {
  const InsuranceCompany = sequelize.define(
    'InsuranceCompany',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,  // Non-Life or Life
        allowNull: false
      }
    },
    {}
  );

  InsuranceCompany.associate = function(models) {
    InsuranceCompany.hasMany(models.InsuranceProduct, { as: 'products' });
  };

  return InsuranceCompany;
};

