import React from 'react';

const InsuranceProduct = ({ product }) => {
  return (
    <div className="insurance-product">
      <h3>{product.productType}</h3>
      <p><strong>Premium:</strong> {product.premium}</p>
      <p><strong>Coverage:</strong> {product.coverage}</p>
      <p><strong>Terms & Conditions:</strong> {product.termsConditions}</p>
    </div>
  );
};

export default InsuranceProduct;

