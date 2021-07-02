import React from "react";
import Paginate from "react-js-pagination";

const Pagination = (props) => {
  return (
    <div className='d-flex justify-content-center mt-5'>
      <Paginate
        activePage={props.currentPage}
        itemsCountPerPage={Number(props.productsPerPage) || 0}
        totalItemsCount={Number(props.productsCount) || 0}
        onChange={props.onChange}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass='page-item'
        linkClass='page-link'
      />
    </div>
  );
};

export default Pagination;
