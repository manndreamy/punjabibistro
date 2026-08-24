import { useMemo, useState } from "react";
import "./index.css";

type Branch = "Dharamkot" | "Zira";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

const branchInfo: Record<
  Branch,
  {
    location: string;
    description: string;
  }
> = {
  Dharamkot: {
    location: "Near Udham Singh Chowk, Dharamkot, Punjab",
    description:
      "Fresh eggless bakery favourites, cakes and café food.",
  },
  Zira: {
    location: "Zira, Punjab",
    description:
      "Fresh bakery favourites, cakes and café food.",
  },
};

/*
  TEMPORARY PRODUCTS

  These are only here to make the ordering system work.
  We will replace them with the bakery's REAL menu and
  REAL prices before the website is given to the bakery.
*/

const products: Product[] = [
  {
    id: 1,
    name: "Featured Cake",
    description: "Fresh eggless celebration cake.",
    price: 0,
    category: "Cakes",
  },
  {
    id: 2,
    name: "Featured Pastry",
    description: "Fresh bakery pastry.",
    price: 0,
    category: "Bakery",
  },
  {
    id: 3,
    name: "Featured Pizza",
    description: "Freshly prepared café pizza.",
    price: 0,
    category: "Pizza",
  },
  {
    id: 4,
    name: "Featured Pasta",
    description: "Freshly prepared pasta.",
    price: 0,
    category: "Pasta",
  },
];

function BrandArc() {
  return (
    <div className="brand-arc" aria-hidden="true">
      <svg viewBox="0 0 300 300">
        <defs>
          <path
            id="brandTextPath"
            d="M 48 150 A 102 102 0 0 1 150 48"
          />
        </defs>

        <path
          className="brand-arc-line"
          d="M 35 150 A 115 115 0 0 1 150 35"
        />

        <text className="brand-arc-text">
          <textPath
            href="#brandTextPath"
            startOffset="0%"
          >
            PUNJABI BISTRO & BAKERY • PUNJABI BISTRO & BAKERY •
          </textPath>
        </text>
      </svg>
    </div>
  );
}

function App() {
  const [page, setPage] = useState<
    "home" | "menu" | "checkout" | "success"
  >("home");

  const [branch, setBranch] = useState<Branch | null>(
    null
  );

  const [cart, setCart] = useState<Product[]>([]);

  const [payment, setPayment] = useState<
    "cod" | "upi" | "netbanking" | "card"
  >("cod");

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, product) => total + product.price,
        0
      ),
    [cart]
  );

  function goHome() {
    setPage("home");
    setBranch(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectBranch(selected: Branch) {
    setBranch(selected);
    setPage("menu");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(product: Product) {
    setCart((current) => [...current, product]);
  }

  function removeFromCart(index: number) {
    setCart((current) =>
      current.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  function openCheckout() {
    if (!cart.length) return;

    setPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /*
   * SUCCESS PAGE
   */

  if (page === "success") {
    return (
      <div className="site">
        <header className="navbar">
          <button
            className="brand"
            onClick={goHome}
          >
            <div className="logo-placeholder">
              PB
            </div>

            <div>
              <strong>Punjabi Bistro</strong>
              <span>& Bakery</span>
            </div>
          </button>
        </header>

        <main className="success-page">
          <div className="success-card">
            <div className="success-check">
              ✓
            </div>

            <span className="eyebrow">
              ORDER RECEIVED
            </span>

            <h1>
              Thank you for your order.
            </h1>

            <p>
              Your Cash on Delivery order has been
              recorded successfully.
            </p>

            <button
              className="primary-button"
              onClick={goHome}
            >
              Back to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  /*
   * CHECKOUT PAGE
   */

  if (page === "checkout" && branch) {
    return (
      <div className="site">
        <header className="navbar">
          <button
            className="brand"
            onClick={goHome}
          >
            <div className="logo-placeholder">
              PB
            </div>

            <div>
              <strong>Punjabi Bistro</strong>
              <span>& Bakery</span>
            </div>
          </button>

          <button
            className="nav-back"
            onClick={() => setPage("menu")}
          >
            ← Back to menu
          </button>
        </header>

        <main className="checkout-page">
          <section className="page-heading">
            <span className="eyebrow">
              CHECKOUT
            </span>

            <h1>
              Complete your order.
            </h1>

            <p>
              Ordering from the{" "}
              <strong>{branch}</strong> branch.
            </p>
          </section>

          <div className="checkout-grid">

            {/* PAYMENT */}

            <section className="checkout-card">
              <span className="eyebrow">
                PAYMENT
              </span>

              <h2>
                Choose payment method
              </h2>

              {/* COD */}

              <button
                className={`payment-option ${
                  payment === "cod"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPayment("cod")
                }
              >
                <div>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <small>
                    Pay when your order arrives
                  </small>
                </div>

                <span className="available">
                  Available
                </span>
              </button>

              {/* UPI */}

              <button
                className="payment-option disabled"
                disabled
              >
                <div>
                  <strong>UPI</strong>

                  <small>
                    Digital payment
                  </small>
                </div>

                <span className="coming-soon">
                  COMING SOON
                </span>
              </button>

              {/* NET BANKING */}

              <button
                className="payment-option disabled"
                disabled
              >
                <div>
                  <strong>
                    Net Banking
                  </strong>

                  <small>
                    Pay using your bank
                  </small>
                </div>

                <span className="coming-soon">
                  COMING SOON
                </span>
              </button>

              {/* CARDS */}

              <button
                className="payment-option disabled"
                disabled
              >
                <div>
                  <strong>
                    Debit / Credit Card
                  </strong>

                  <small>
                    Online card payment
                  </small>
                </div>

                <span className="coming-soon">
                  COMING SOON
                </span>
              </button>
            </section>

            {/* ORDER SUMMARY */}

            <section className="checkout-card">
              <span className="eyebrow">
                YOUR ORDER
              </span>

              <h2>
                Order summary
              </h2>

              {cart.map((product, index) => (
                <div
                  className="summary-item"
                  key={`${product.id}-${index}`}
                >
                  <div>
                    <strong>
                      {product.name}
                    </strong>

                    <small>
                      {product.category}
                    </small>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(index)
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  {cartTotal === 0
                    ? "Price to be confirmed"
                    : `₹${cartTotal}`}
                </strong>
              </div>

              <button
                className="primary-button full-width"
                onClick={() =>
                  setPage("success")
                }
              >
                Place COD Order
              </button>
            </section>

          </div>
        </main>
      </div>
    );
  }

  /*
   * BRANCH MENU
   */

  if (page === "menu" && branch) {
    return (
      <div className="site">
        <header className="navbar">
          <button
            className="brand"
            onClick={goHome}
          >
            <div className="logo-placeholder">
              PB
            </div>

            <div>
              <strong>Punjabi Bistro</strong>
              <span>& Bakery</span>
            </div>
          </button>

          <button
            className="nav-back"
            onClick={goHome}
          >
            ← Home
          </button>
        </header>

        <main>

          <section className="branch-hero">

            <BrandArc />

            <div>
              <span className="eyebrow">
                {branch.toUpperCase()} BRANCH
              </span>

              <h1>
                Fresh food.
                <br />
                Freshly made.
              </h1>

              <p>
                {branchInfo[branch].description}
              </p>

              <span className="location">
                📍 {branchInfo[branch].location}
              </span>
            </div>

          </section>

          <section className="menu-section">

            <div className="page-heading">
              <span className="eyebrow">
                MENU
              </span>

              <h2>
                Choose something delicious.
              </h2>

              <p>
                Our real menu and prices will be
                added before launch.
              </p>
            </div>

            <div className="product-grid">

              {products.map((product) => (
                <article
                  className="product-card"
                  key={product.id}
                >

                  <div className="product-photo">
                    <span>
                      {product.category}
                    </span>
                  </div>

                  <div className="product-info">

                    <span className="category">
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>

                    <div className="product-footer">

                      <strong>
                        {product.price === 0
                          ? "Price to be confirmed"
                          : `₹${product.price}`}
                      </strong>

                      <button
                        className="add-button"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        + Add
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>

          </section>

          {cart.length > 0 && (
            <div className="cart-bar">

              <div>
                <strong>
                  {cart.length} item
                  {cart.length !== 1
                    ? "s"
                    : ""}
                </strong>

                <span>
                  {cartTotal === 0
                    ? "Price to be confirmed"
                    : `₹${cartTotal}`}
                </span>
              </div>

              <button
                className="primary-button"
                onClick={openCheckout}
              >
                Continue →
              </button>

            </div>
          )}

        </main>
      </div>
    );
  }

  /*
   * HOMEPAGE
   */

  return (
    <div className="site">

      <header className="navbar">

        <button
          className="brand"
          onClick={goHome}
        >
          <div className="logo-placeholder">
            PB
          </div>

          <div>
            <strong>
              Punjabi Bistro
            </strong>

            <span>
              & Bakery
            </span>
          </div>
        </button>

        <nav>
          <a href="#branches">
            Branches
          </a>

          <a href="#about">
            About
          </a>

          <a
            href="https://www.instagram.com/punjabibistro/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>
        </nav>

      </header>

      <main>

        {/* HERO */}

        <section className="hero">

          <BrandArc />

          <div className="hero-copy">

            <span className="eyebrow">
              EGGLESS BAKERY • CAFÉ • DELIVERY
            </span>

            <h1>
              Freshly baked.
              <br />
              Beautifully made.
            </h1>

            <p>
              Cakes, bakery favourites and freshly
              prepared café food from Punjabi Bistro
              & Bakery.
            </p>

            <button
              className="primary-button"
              onClick={() =>
                document
                  .getElementById("branches")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Order from a branch →
            </button>

          </div>

          {/* OPTION B COLLAGE */}

          <div className="hero-collage">

            <div className="photo-card main-photo">
              <div className="photo-placeholder">
                <span>
                  MAIN FOOD PHOTO
                </span>

                <small>
                  Replace with bakery photo
                </small>
              </div>
            </div>

            <div className="photo-card small-photo top-photo">
              <div className="photo-placeholder">
                <span>
                  CAKE
                </span>
              </div>
            </div>

            <div className="photo-card small-photo bottom-photo">
              <div className="photo-placeholder">
                <span>
                  BAKERY
                </span>
              </div>
            </div>

          </div>

        </section>

        {/* TRUST */}

        <section className="trust">

          <div>
            <strong>
              4.4★
            </strong>

            <span>
              Google rating
            </span>
          </div>

          <div>
            <strong>
              168+
            </strong>

            <span>
              Reviews
            </span>
          </div>

          <div>
            <strong>
              2
            </strong>

            <span>
              Branches
            </span>
          </div>

          <div>
            <strong>
              Eggless
            </strong>

            <span>
              Bakery focus
            </span>
          </div>

        </section>

        {/* BRANCHES */}

        <section
          id="branches"
          className="branches"
        >

          <div className="page-heading">

            <span className="eyebrow">
              ORDER ONLINE
            </span>

            <h2>
              Choose your branch.
            </h2>

            <p>
              Select the branch you want to
              order from.
            </p>

          </div>

          <div className="branch-grid">

            {(Object.keys(
              branchInfo
            ) as Branch[]).map(
              (item) => (
                <article
                  className="branch-card"
                  key={item}
                >

                  <div className="branch-photo">
                    <span>
                      {item}
                    </span>
                  </div>

                  <div className="branch-content">

                    <span className="category">
                      PUNJABI BISTRO & BAKERY
                    </span>

                    <h3>
                      {item}
                    </h3>

                    <p>
                      {
                        branchInfo[item]
                          .description
                      }
                    </p>

                    <span className="location">
                      📍{" "}
                      {
                        branchInfo[item]
                          .location
                      }
                    </span>

                    <button
                      className="branch-button"
                      onClick={() =>
                        selectBranch(item)
                      }
                    >
                      Select {item} Branch →
                    </button>

                  </div>

                </article>
              )
            )}

          </div>

        </section>

        {/* ABOUT */}

        <section
          id="about"
          className="about"
        >

          <div>

            <span className="eyebrow">
              PUNJABI BISTRO & BAKERY
            </span>

            <h2>
              From everyday cravings
              to special celebrations.
            </h2>

            <p>
              Discover a bakery and café made for
              fresh food, sweet moments and
              memorable celebrations.
            </p>

          </div>

          <div className="about-points">

            <div>
              <span>
                01
              </span>

              <strong>
                Eggless cakes
              </strong>
            </div>

            <div>
              <span>
                02
              </span>

              <strong>
                Fresh café food
              </strong>
            </div>

            <div>
              <span>
                03
              </span>

              <strong>
                Two convenient branches
              </strong>
            </div>

          </div>

        </section>

        {/* INSTAGRAM */}

        <section className="instagram">

          <span className="eyebrow">
            FOLLOW ALONG
          </span>

          <h2>
            More from Punjabi Bistro.
          </h2>

          <p>
            See cakes, food and bakery creations
            on Instagram.
          </p>

          <a
            href="https://www.instagram.com/punjabibistro/"
            target="_blank"
            rel="noreferrer"
            className="outline-button"
          >
            Visit Instagram →
          </a>

        </section>

      </main>

        <footer className="footer">

        <div>

          <strong>
            Punjabi Bistro & Bakery
          </strong>

          <span>
            Dharamkot • Zira
          </span>

        </div>

        <a
          href="https://www.instagram.com/punjabibistro/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram →
        </a>

      </footer>

    </div>
  );
}

export default App;