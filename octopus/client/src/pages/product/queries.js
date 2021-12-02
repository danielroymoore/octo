import gql from "graphql-tag";

const GET_PRODUCT = gql`
  query getProductById($productId: ID!) {
    product(productId: $productId) {
      id
      name
      power
      description
      price
      quantity
      brand
      weight
      height
      width
      length
      modelCode
      colour
      imgUrl
    }
  }
`;

const getProductMock = {
  request: {
    query: GET_PRODUCT,
    variables: {
      productId: 1,
    },
  },
  result: {
    data: {
      product: {
        id: 1,
        name: "Mock Product",
        imgUrl: "",
        price: 1299,
        power: "",
        description: "",
        quantity: "",
        brand: "",
        weight: "",
        height: "",
        width: "",
        length: "",
        modelCode: "",
        colour: "",
      },
    },
  },
};

const getProductErrorMock = {
  request: {
    query: GET_PRODUCT,
    variables: {
      productId: 1,
    },
  },
  error: new Error("error"),
};

export { GET_PRODUCT, getProductMock, getProductErrorMock };
