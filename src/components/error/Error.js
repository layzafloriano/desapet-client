import React from 'react';

const Error = (props) => {
  return(
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      Ocorreu um erro tente novamente.
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
</div>
  )
}

export default Error;