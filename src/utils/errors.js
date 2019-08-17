class GraphqlError extends Error {
  code = 451;
  message = this.message ||
    'An error occurred';
}

export {GraphqlError}