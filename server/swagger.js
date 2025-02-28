import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Naturaliza API",
      version: "1.0.0",
      description: 'Api shopping Natiraliza',
      contact:{
        name:'Developer'
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
