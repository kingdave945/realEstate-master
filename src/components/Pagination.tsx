import React from "react";
import image1 from "../assets/arrow-left-svgrepo-com 1 (1).svg";
import image2 from "../assets/arrow-left-svgrepo-com 1.svg";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Calculate page numbers to display (max 3)
  let pages: number[] = [];
  if (totalPages <= 3) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage === 1) {
    pages = [1, 2, 3];
  } else if (currentPage === totalPages) {
    pages = [totalPages - 2, totalPages - 1, totalPages];
  } else {
    pages = [currentPage - 1, currentPage, currentPage + 1];
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 900,
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: "none",
          background: "transparent",
          color: "#457b9d",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:"white",
          transition: "background 0.2s",
        }}
        aria-label="Previous page"
        onMouseOver={(e) => (e.currentTarget.style.background = "#e0e7ef")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#f1faee")}
      >
        <img style={{width:"50%"}} src={image1} alt="&gt" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "none",
            background: page === currentPage ? "#457b9d" : "#f1faee",
            color: page === currentPage ? "#fff" : "#457b9d",
            cursor: page === currentPage ? "not-allowed" : "pointer",
            fontSize: "1.1rem",
            fontWeight: page === currentPage ? "bold" : "normal",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          aria-label={`Page ${page}`}
          onMouseOver={(e) => {
            if (page !== currentPage)
              e.currentTarget.style.background = "#e0e7ef";
          }}
          onMouseOut={(e) => {
            if (page !== currentPage)
              e.currentTarget.style.background = "#f1faee";
          }}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: "none",
          background: "transparent",
          color: "#457b9d",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          backgroundColor:"white",
          justifyContent: "center",
          transition: "background 0.2s",
        }}
        aria-label="Next page"
        onMouseOver={(e) => (e.currentTarget.style.background = "#e0e7ef")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#f1faee")}
      >
        
        <img style={{width:"50%"}} src={image2} alt="&gt" />
      </button>
      
    </div>
  );
};

export default Pagination;