/* scripts.js */

document.addEventListener('DOMContentLoaded', function () {
  /* Sample data */
  const insuranceData = {
    'Motor Insurance': [
      { name: 'AutoGuard Ltd', premium: '$500', coverage: '$50,000 for vehicle damage/theft', terms: 'Max coverage for cars under 10 years old. 5% deductible for claims.' },
      { name: 'SafeDrive Inc', premium: '$450', coverage: '$45,000 for vehicle damage/theft', terms: 'Only for drivers aged 25-60. 10% increase for high-risk drivers.' },
      /*Additional data omitted for brevity*/
    ],
    'Health Insurance': [
      { name: 'HealthyLife', premium: '$1,200', coverage: '$100,000 for hospitalization', terms: 'Coverage for in-patient only. No pre-existing conditions coverage for 2 years.' },
      /*Additional data omitted for brevity*/
    ],
    /*Other product categories (Home, Term Life, etc.)*/
  };

  /* Elements */
  const productTypeSelect = document.getElementById('product-type');
  const companySelect = document.getElementById('company');
  const comparisonResults = document.getElementById('comparison-results');

  /* Populate product type dropdown */
  for (const productType in insuranceData) {
    const option = document.createElement('option');
    option.value = productType;
    option.textContent = productType;
    productTypeSelect.appendChild(option);
  }

  /* Event listener for product type change */
  productTypeSelect.addEventListener('change', function () {
    const selectedProductType = this.value;
    companySelect.innerHTML = ''; /* Clear previous options */

    if (selectedProductType) {
      const companies = insuranceData[selectedProductType];
      companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company.name;
        option.textContent = company.name;
        companySelect.appendChild(option);
      });
    }
  });

  /* Form submission handling */
  document.getElementById('compare-form').addEventListener('submit', function (event) {
    event.preventDefault(); /* Prevent default form submission */

    const productType = productTypeSelect.value;
    const company = companySelect.value;

    if (productType && company) {
      const selectedProduct = insuranceData[productType].find(p => p.name === company);

      if (selectedProduct) {
        comparisonResults.innerHTML = `
          <h3>Comparison Results</h3>
          <p><strong>Product Type:</strong> ${productType}</p>
          <p><strong>Company:</strong> ${selectedProduct.name}</p>
          <p><strong>Premium:</strong> ${selectedProduct.premium}</p>
          <p><strong>Coverage:</strong> ${selectedProduct.coverage}</p>
          <p><strong>Terms:</strong> ${selectedProduct.terms}</p>
        `;
      }
    }
  });
});

