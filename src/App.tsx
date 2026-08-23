import "./index.css";

const branches = [
  {
    name: "Dharamkot",
    location: "Near Udham Singh Chowk, Dharamkot",
    description:
      "Fresh eggless bakery, cakes and delicious food.",
  },
  {
    name: "Zira",
    location: "Ferozepur Road, Zira",
    description:
      "Fresh eggless bakery, cakes and delicious food.",
  },
];

function App() {
  return (
    <div className="app">

      {/* NAVIGATION */}
      <header className="navbar">
        <div className="brand">
          <div className="logo-placeholder">
            PB
          </div>

          <div className="brand-text">
            <h1>Punjabi Bistro & Bakery</h1>
            <span>Fresh • Eggless • Delicious</span>
          </div>
        </div>

        <a
          href="https://www.instagram.com/punjabibistro/"
          target="_blank"
          rel="noreferrer"
          className="instagram-link"
        >
          Instagram
        </a>
      </header>


      {/* HERO */}
      <main>

        <section className="hero">
          <div className="hero-content">

            <span className="eyebrow">
              PUNJABI BISTRO & BAKERY
            </span>

            <h2>
              Freshly made.
              <br />
              Made for you.
            </h2>

            <p>
              Discover delicious food, fresh bakery favourites
              and eggless cakes from your nearest Punjabi Bistro
              & Bakery branch.
            </p>

            <a
              href="#branches"
              className="primary-button"
            >
              Order Now
            </a>

          </div>
        </section>


        {/* BRANCHES */}
        <section
          id="branches"
          className="branches-section"
        >

          <div className="section-heading">

            <span className="eyebrow">
              OUR BRANCHES
            </span>

            <h3>
              Where would you like to order from?
            </h3>

            <p>
              Choose your branch to explore its menu.
            </p>

          </div>


          <div className="branch-grid">

            {branches.map((branch) => (

              <article
                className="branch-card"
                key={branch.name}
              >

                <div className="branch-image">
                  <span>{branch.name}</span>
                </div>

                <div className="branch-card-content">

                  <span className="branch-type">
                    PUNJABI BISTRO & BAKERY
                  </span>

                  <h4>
                    {branch.name}
                  </h4>

                  <p>
                    {branch.description}
                  </p>

                  <span className="location">
                    📍 {branch.location}
                  </span>

                  <button
                    className="branch-button"
                    type="button"
                  >
                    View Menu →
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* PAYMENT */}
        <section className="payment-section">

          <span className="eyebrow">
            PAYMENT
          </span>

          <h3>
            Easy ordering. More payment options coming soon.
          </h3>

          <p>
            Cash on Delivery will be available first.
            UPI, cards and Net Banking will be introduced soon.
          </p>

          <div className="payment-options">

            <span>
              Cash on Delivery
            </span>

            <span>
              UPI — Coming Soon
            </span>

            <span>
              Cards — Coming Soon
            </span>

            <span>
              Net Banking — Coming Soon
            </span>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="footer">

        <div>
          <strong>
            Punjabi Bistro & Bakery
          </strong>

          <p>
            Dharamkot • Zira
          </p>
        </div>

        <a
          href="https://www.instagram.com/punjabibistro/"
          target="_blank"
          rel="noreferrer"
        >
          Follow us on Instagram →
        </a>

      </footer>

    </div>
  );
}

export default App;