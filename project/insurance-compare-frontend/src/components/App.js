import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Typography, Box, Paper, Card, CardContent, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { getNonLifeInsuranceCompanies, getLifeInsuranceCompanies } from './api';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [nonLifeCompanies, setNonLifeCompanies] = useState([]);
  const [lifeCompanies, setLifeCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nonLifeResponse, lifeResponse] = await Promise.all([
          getNonLifeInsuranceCompanies(),
          getLifeInsuranceCompanies()
        ]);

        setNonLifeCompanies(nonLifeResponse.data);
        setLifeCompanies(lifeResponse.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container>
          <Box my={4}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Insurance Compare
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to the Insurance Compare app. Use this application to compare various insurance products.
              </Typography>

              {loading && <CircularProgress />}
              {error && <Typography color="error">{error}</Typography>}

              {!loading && !error && (
                <>
                  <Box mt={4}>
                    <Typography variant="h5">Non-Life Insurance Companies</Typography>
                    {nonLifeCompanies.map(company => (
                      <Card key={company.id} style={{ marginBottom: '16px' }}>
                        <CardContent>
                          <Typography variant="h6">{company.name}</Typography>
                          {company.products.map(product => (
                            <Typography key={product.id} variant="body2">
                              {product.productType}: {product.premium} - {product.coverage}
                            </Typography>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </Box>

                  <Box mt={4}>
                    <Typography variant="h5">Life Insurance Companies</Typography>
                    {lifeCompanies.map(company => (
                      <Card key={company.id} style={{ marginBottom: '16px' }}>
                        <CardContent>
                          <Typography variant="h6">{company.name}</Typography>
                          {company.products.map(product => (
                            <Typography key={product.id} variant="body2">
                              {product.productType}: {product.premium} - {product.coverage}
                            </Typography>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </>
              )}
            </Paper>
          </Box>
        </Container>
        
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} /> {/* Example of a protected route */}
          <Redirect from="/" to="/login" /> {/* Redirect to login page if no match */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

