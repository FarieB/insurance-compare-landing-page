import React from 'react';
import InsuranceProduct from './InsuranceProduct';

const InsuranceCompany = ({ company }) => {
  return (
    <div className="insurance-company">
      <h2>{company.name}</h2>
      {company.products.map(product => (
        <InsuranceProduct key={product.id} product={product} />
      ))}
    </div>
  );
};

export default InsuranceCompany;

