import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Dogan E-Commerce",
  keywrods: "swimwear, men, sea, sun, shorts, beach",
  description: "Best brand and prices in men`s swimwear",
};

export default Meta;
