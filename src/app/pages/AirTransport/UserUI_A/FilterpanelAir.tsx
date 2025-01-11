import React, { useState } from "react";

const FilterpanelAir: React.FC = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the filter logic
  };

  // Inline CSS styles
  const styles = {
    filterPanel: {
      backgroundColor: "#ffffff",
      borderRadius: "10px",
    },
    filterCard: {
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "box-shadow 0.3s ease",
    },
    filterCardHover: {
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
    },
    filterCardBody: {
      padding: "1.5rem",
    },
    sectionTitle: {
      color: "#007bff",
      fontSize: "1.25rem",
    },
    filterLabel: {
      fontWeight: "600",
      fontSize: "0.9rem",
      color: "#555",
    },
    filterInputLabel: {
      fontWeight: "600",
      fontSize: "0.8rem",
      color: "#666",
    },
    filterBtn: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "0.8rem 2rem",
      borderRadius: "30px",
      border: "none",
      transition: "background-color 0.3s ease",
    },
    filterBtnHover: {
      backgroundColor: "#0056b3",
    },
    customBudgetSection: {
      marginTop: "1rem",
      padding: "1rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    dFlex: {
      display: "flex",
      justifyContent: "space-between",
    },
    mr3: {
      marginRight: "1rem",
    },
  };

  return (
    <div className="filter-panel container mt-4" style={styles.filterPanel}>
      <div
        className="card shadow-lg p-4 filter-card"
        style={styles.filterCard}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = styles.filterCardHover.boxShadow)}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = styles.filterCard.boxShadow)}
      >
        <div className="card-header border-0 pt-5">
          <h3 className="card-title text-center font-weight-bold fs-3 mb-4">Filters</h3>
        </div>
        <div className="card-body filter-card-body" style={styles.filterCardBody}>
          <form onSubmit={handleFilterSubmit}>
            <h5 className="font-weight-bold mb-3 filter-section-title" style={styles.sectionTitle}>
              Airlines
            </h5>
            <ul className="filterList list-unstyled">
              <li>
                <input type="checkbox" id="vistara" aria-label="vistara" value="vistara" />
                <label htmlFor="vistara" className="filter-label" style={styles.filterLabel}>
                  Vistara
                </label>
              </li>
              <li>
                <input type="checkbox" id="Spice-jet" aria-label="Spice-jet" value="Spice-jet" />
                <label htmlFor="Spice-jet" className="filter-label" style={styles.filterLabel}>
                  Spice-jet
                </label>
              </li>
              <li>
                <input type="checkbox" id="family" aria-label="Family" value="Family" />
                <label htmlFor="Indidgo" className="filter-label" style={styles.filterLabel}>
                  Indigo
                </label>
              </li>
              <li>
                <input type="checkbox" id="five-star" aria-label="5-Star" value="5-Star" />
                <label htmlFor="five-star" className="filter-label" style={styles.filterLabel}>
                  5-Star
                </label>
              </li>
            </ul>

            <h5 className="font-weight-bold mb-3 filter-section-title" style={styles.sectionTitle}>
              Price Range
            </h5>
            <ul className="filterList list-unstyled">
              <li>
                <input type="checkbox" id="under-2000" aria-label="Under 2000" value="Under 2000" />
                <label htmlFor="under-2000" className="filter-label" style={styles.filterLabel}>
                  Under ₹2000
                </label>
              </li>
              <li>
                <input type="checkbox" id="2000-6000" aria-label="2000 - 6000" value="2000 - 6000" />
                <label htmlFor="2000-6000" className="filter-label" style={styles.filterLabel}>
                  ₹2000 - ₹6000
                </label>
              </li>
              <li>
                <input type="checkbox" id="custom-budget" aria-label="Custom Budget" value="Custom Budget" />
                <div className="custom-budget-section" style={styles.customBudgetSection}>
                  <h4 className="filter-section-title" style={styles.sectionTitle}>
                    Your Budget
                  </h4>
                  <div className="d-flex" style={styles.dFlex}>
                    <div className="d-flex flex-column mr-3" style={styles.mr3}>
                      <label className="filter-input-label" style={styles.filterInputLabel}>
                        Min:
                      </label>
                      <input
                        type="number"
                        placeholder="₹ Min"
                        className="form-control form-control-sm"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <label className="filter-input-label" style={styles.filterInputLabel}>
                        Max:
                      </label>
                      <input
                        type="number"
                        placeholder="₹ Max"
                        className="form-control form-control-sm"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <h5 className="font-weight-bold mb-3 filter-section-title" style={styles.sectionTitle}>
              Rating
            </h5>
            <ul className="filterList list-unstyled">
              <li>
                <input type="checkbox" id="very-good" aria-label="Very Good" value="Very Good" />
                <label htmlFor="very-good" className="filter-label" style={styles.filterLabel}>
                  Very Good
                </label>
              </li>
              <li>
                <input type="checkbox" id="good" aria-label="Good" value="Good" />
                <label htmlFor="good" className="filter-label" style={styles.filterLabel}>
                  Good
                </label>
              </li>
              <li>
                <input type="checkbox" id="better" aria-label="Better" value="Better" />
                <label htmlFor="better" className="filter-label" style={styles.filterLabel}>
                  Better
                </label>
              </li>
            </ul>

            <div className="mb-3 text-center">
              <button
                type="submit"
                className="btn btn-primary filter-btn"
                style={styles.filterBtn}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.filterBtnHover.backgroundColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.filterBtn.backgroundColor)}
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterpanelAir;
