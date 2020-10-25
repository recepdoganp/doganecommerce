import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Style Bootstrap
import { Container } from "react-bootstrap";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
