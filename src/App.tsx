import { useState } from "react";
import "./index.css";

type Page = "home" | "branch" | "checkout" | "success";

type Branch = {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  image: string;
};

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

type CartItem = Product & {
  quantity: number;
};

const branches: Branch[] = [
  {
    id: "dharamkot",
    name: "Dharamkot",
    subtitle: "Freshly baked in the hills",
    address: "Dharamkot, Himachal Pradesh",
    image: "/images/dharamkot-store.jpg",
  },
  {
    id: "zira",
    name: "Zira",
    subtitle: "Your neighbourhood bakery",
    address: "Zira, Punjab",
    image: "/images/zira-store.jpg",
  },
];

const products: Product[] = [
  {
    id: 1,
    name: "Chocolate Cake",
    category: "Cakes",
    price: 499,
    image: "/images/cake-1.jpg",
    description: "Rich, soft and freshly prepared.",
  },
  {
    id: 2,
    name: "Fresh Pastry",
    category: "Pastries",
    price: 99,
    image: "/images/pastry-1.jpg",
    description: "A delicious freshly baked treat.",
  },
  {
    id: 3,
    name: "Bakery Special",
    category: "Specials",
    price: 149,
    image: "/images/bakery-special.jpg",
    description: "One of our freshly prepared favourites.",
  },
  {
    id: 4,
    name: "Fresh Cookies",
    category: "Cookies",
    price: 199,
    image: "/images/cookies.jpg",
    description: "Crispy, delicious and freshly baked.",
  },
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="instagram-svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function App() {
  const [page, setPage] = useState<Page>("home");

  const [selectedBranch, setSelectedBranch] =
    useState<Branch | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);

  const [paymentMethod, setPaymentMethod] =
    useState<"cod">("cod");

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goHome = () => {
    setPage("home");
    setSelectedBranch(null);
    scrollTop();
  };

  const chooseBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setPage("branch");
    scrollTop();
  };

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const openCheckout = () => {
    if (cart.length === 0) return;

    setPage("checkout");
    scrollTop();
  };

  const placeOrder = () => {
    setPage("success");
    scrollTop();
  };

  return (
    <div className="site">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">

        <button
          className="brand"
          type="button"
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

        <nav>

          <a
            href="#branches"
            onClick={() => setPage("home")}
          >
            Branches
          </a>

          <a
            href="#about"
            onClick={() => setPage("home")}
          >
            Our Story
          </a>

          <a
            href="#instagram"
            onClick={() => setPage("home")}
          >
            Instagram
          </a>

          {cart.length > 0 && (
            <button
              className="nav-cart"
              type="button"
              onClick={openCheckout}
            >
              Cart ({cartCount})
            </button>
          )}

        </nav>

      </header>


      {/* =====================================================
          MOVING BANNER
      ===================================================== */}

      <div className="announcement">

        <div className="announcement-track">

          <span>PUNJABI BISTRO & BAKERY</span>
          <b>•</b>

          <span>EGGLESS BAKERY</span>
          <b>•</b>

          <span>FRESHLY BAKED</span>
          <b>•</b>

          <span>SAME-DAY DELIVERY</span>
          <b>•</b>

          <span>DHARAMKOT</span>
          <b>•</b>

          <span>ZIRA</span>
          <b>•</b>

          <span>PUNJABI BISTRO & BAKERY</span>
          <b>•</b>

          <span>EGGLESS BAKERY</span>
          <b>•</b>

          <span>FRESHLY BAKED</span>
          <b>•</b>

          <span>SAME-DAY DELIVERY</span>
          <b>•</b>

          <span>DHARAMKOT</span>
          <b>•</b>

          <span>ZIRA</span>
          <b>•</b>

        </div>

      </div>


      {/* =====================================================
          HOME PAGE
      ===================================================== */}

      {page === "home" && (
        <main>

          {/* HERO */}

          <section className="hero-new">

            <div className="hero-new-copy">

              <span className="eyebrow">
                PUNJABI BISTRO & BAKERY
              </span>

              <h1>
                Good things
                <br />
                are <em>baked</em>
                <br />
                here.
              </h1>

              <p>
                Freshly prepared bakery favourites,
                delicious treats and everyday goodness
                from our Dharamkot and Zira branches.
              </p>

              <div className="hero-actions">

                <a
                  href="#branches"
                  className="primary-button"
                >
                  ORDER NOW
                </a>

                <a
                  href="#bestsellers"
                  className="outline-button"
                >
                  EXPLORE
                </a>

              </div>

            </div>


            <div className="hero-new-image">

              <img
                src="/images/hero.jpg"
                alt="Punjabi Bistro & Bakery"
              />

              <div className="hero-badge">

                <strong>
                  100%
                </strong>

                <span>
                  EGGLESS
                </span>

              </div>

            </div>

          </section>


          {/* BRANCHES */}

          <section
            className="branch-section"
            id="branches"
          >

            <div className="section-heading">

              <span className="eyebrow">
                ORDER FROM YOUR FAVOURITE BRANCH
              </span>

              <h2>
                Where should we
                <br />
                send the good stuff?
              </h2>

              <p>
                Choose your branch and explore its menu.
              </p>

            </div>


            <div className="branch-grid-new">

              {branches.map((branch) => (
                <article
                  className="branch-card-new"
                  key={branch.id}
                >

                  <div className="branch-image-new">

                    <img
                      src={branch.image}
                      alt={`${branch.name} branch`}
                    />

                  </div>


                  <div className="branch-info-new">

                    <span className="branch-label">
                      PUNJABI BISTRO & BAKERY
                    </span>

                    <h3>
                      {branch.name}
                    </h3>

                    <p>
                      {branch.subtitle}
                    </p>

                    <small>
                      {branch.address}
                    </small>

                    <button
                      className="primary-button"
                      type="button"
                      onClick={() =>
                        chooseBranch(branch)
                      }
                    >
                      ORDER FROM{" "}
                      {branch.name.toUpperCase()}
                      <span>→</span>
                    </button>

                  </div>

                </article>
              ))}

            </div>

          </section>


          {/* BEST SELLERS */}

          <section
            className="best-sellers"
            id="bestsellers"
          >

            <div className="section-heading centered">

              <span className="eyebrow">
                FRESH FROM THE BAKERY
              </span>

              <h2>
                Our favourites
              </h2>

              <p>
                A few things we think you should try first.
              </p>

            </div>


            <div className="product-grid-new">

              {products.slice(0, 3).map((product) => (
                <article
                  className="product-card-new"
                  key={product.id}
                >

                  <div className="product-image-new">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  </div>


                  <div className="product-content-new">

                    <span>
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>


                    <div className="product-bottom">

                      <strong>
                        ₹{product.price}
                      </strong>

                      <button
                        className="add-button"
                        type="button"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        + ADD
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>

          </section>


          {/* STORY */}

          <section
            className="story-section"
            id="about"
          >

            <div className="story-image">

              <img
                src="/images/interior.jpg"
                alt="Punjabi Bistro bakery interior"
              />

            </div>


            <div className="story-copy">

              <span className="eyebrow">
                MADE WITH CARE
              </span>

              <h2>
                From our bakery
                <br />
                to your table.
              </h2>

              <p>
                Punjabi Bistro & Bakery brings together
                freshly baked favourites, comforting
                flavours and the warmth of a local bakery.
              </p>

              <button
                className="outline-button"
                type="button"
                onClick={() =>
                  document
                    .getElementById("branches")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                FIND YOUR BRANCH →
              </button>

            </div>

          </section>


          {/* WHY US */}

          <section className="why-section">

            <div className="section-heading centered">

              <span className="eyebrow">
                WHY PUNJABI BISTRO?
              </span>

              <h2>
                Simple. Fresh. Delicious.
              </h2>

            </div>


            <div className="why-grid">

              <div>
                <strong>01</strong>

                <h3>
                  Eggless
                </h3>

                <p>
                  Delicious bakery favourites made
                  without eggs.
                </p>
              </div>


              <div>
                <strong>02</strong>

                <h3>
                  Fresh
                </h3>

                <p>
                  Prepared with freshness and quality
                  in mind.
                </p>
              </div>


              <div>
                <strong>03</strong>

                <h3>
                  Local
                </h3>

                <p>
                  Two branches serving customers in
                  Dharamkot and Zira.
                </p>
              </div>


              <div>
                <strong>04</strong>

                <h3>
                  Delivery
                </h3>

                <p>
                  Same-day delivery according to branch
                  and location.
                </p>
              </div>

            </div>

          </section>


          {/* INSTAGRAM */}

          <section
            className="instagram-new"
            id="instagram"
          >

            <span className="eyebrow">
              FOLLOW ALONG
            </span>

            <h2>
              @punjabibistro
            </h2>

            <p>
              See what's fresh, what's baking and
              what's happening at Punjabi Bistro.
            </p>


            <a
              href="https://www.instagram.com/punjabibistro/"
              target="_blank"
              rel="noreferrer"
              className="instagram-main-button"
            >

              <InstagramIcon />

              FOLLOW ON INSTAGRAM

              <span>
                →
              </span>

            </a>

          </section>

        </main>
      )}


      {/* =====================================================
          BRANCH PAGE
      ===================================================== */}

      {page === "branch" && selectedBranch && (
        <main>

          <section className="branch-page-hero">

            <div>

              <button
                className="back-button"
                type="button"
                onClick={goHome}
              >
                ← BACK TO HOME
              </button>

              <span className="eyebrow">
                PUNJABI BISTRO & BAKERY
              </span>

              <h1>
                {selectedBranch.name}
              </h1>

              <p>
                {selectedBranch.subtitle}
              </p>

              <small>
                {selectedBranch.address}
              </small>

            </div>


            <img
              src={selectedBranch.image}
              alt={`${selectedBranch.name} branch`}
            />

          </section>


          {/* MENU */}

          <section className="menu-section-new">

            <div className="section-heading">

              <span className="eyebrow">
                {selectedBranch.name.toUpperCase()} MENU
              </span>

              <h2>
                Pick your favourites.
              </h2>

              <p>
                Add anything you like to your cart.
              </p>

            </div>


            <div className="product-grid-new">

              {products.map((product) => (
                <article
                  className="product-card-new"
                  key={product.id}
                >

                  <div className="product-image-new">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  </div>


                  <div className="product-content-new">

                    <span>
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>


                    <div className="product-bottom">

                      <strong>
                        ₹{product.price}
                      </strong>

                      <button
                        className="add-button"
                        type="button"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        + ADD
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>

          </section>

        </main>
      )}


      {/* =====================================================
          CHECKOUT
      ===================================================== */}

      {page === "checkout" && (
        <main className="checkout-new">

          <div className="section-heading">

            <button
              className="back-button"
              type="button"
              onClick={() => {
                setPage("branch");
                scrollTop();
              }}
            >
              ← BACK TO MENU
            </button>

            <span className="eyebrow">
              CHECKOUT
            </span>

            <h1>
              Almost there.
            </h1>

            <p>
              Complete your details and choose your
              payment method.
            </p>

          </div>


          <div className="checkout-layout">

            {/* ORDER SUMMARY */}

            <section className="checkout-box">

              <h2>
                Your order
              </h2>


              {cart.length === 0 ? (
                <p>
                  Your cart is empty.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    className="checkout-item"
                    key={item.id}
                  >

                    <div>

                      <strong>
                        {item.name}
                      </strong>

                      <small>
                        ₹{item.price} ×{" "}
                        {item.quantity}
                      </small>

                    </div>


                    <button
                      className="remove-button"
                      type="button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>
                ))
              )}


              <div className="checkout-total">

                <span>
                      Order total
                </span>

                <strong>
                  ₹{cartTotal}
                </strong>

              </div>

            </section>


            {/* CUSTOMER + PAYMENT */}

            <section className="checkout-box">

              <h2>
                Delivery details
              </h2>

              <div className="form-group">

                <label htmlFor="customer-name">
                  Full name
                </label>

                <input
                  id="customer-name"
                  type="text"
                  placeholder="Enter your name"
                />

              </div>


              <div className="form-group">

                <label htmlFor="customer-phone">
                  Phone number
                </label>

                <input
                  id="customer-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                />

              </div>


              <div className="form-group">

                <label htmlFor="customer-address">
                  Delivery address
                </label>

                <textarea
                  id="customer-address"
                  placeholder="House / street / area / landmark"
                  rows={4}
                />

              </div>


              <h3 className="payment-title">
                Payment method
              </h3>


              {/* COD — AVAILABLE */}

              <button
                className="payment-option-new selected"
                type="button"
                onClick={() =>
                  setPaymentMethod("cod")
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
                  AVAILABLE
                </span>

              </button>


              {/* UPI — COMING SOON */}

              <button
                className="payment-option-new disabled"
                type="button"
                disabled
              >

                <div>

                  <strong>
                    UPI
                  </strong>

                  <small>
                    Online UPI payment
                  </small>

                </div>

                <span className="coming-soon">
                  COMING SOON
                </span>

              </button>


              {/* NET BANKING — COMING SOON */}

              <button
                className="payment-option-new disabled"
                type="button"
                disabled
              >

                <div>

                  <strong>
                    NetBanking
                  </strong>

                  <small>
                    Pay directly through your bank
                  </small>

                </div>

                <span className="coming-soon">
                  COMING SOON
                </span>

              </button>


              <button
                className="primary-button checkout-place-button"
                type="button"
                onClick={placeOrder}
                disabled={cart.length === 0}
              >
                PLACE ORDER — ₹{cartTotal}
              </button>

            </section>

          </div>

        </main>
      )}


      {/* =====================================================
          SUCCESS PAGE
      ===================================================== */}

      {page === "success" && (
        <main className="success-new">

          <section className="success-new-card">

            <div className="success-check">
              ✓
            </div>

            <span className="eyebrow">
              ORDER RECEIVED
            </span>

            <h1>
              Thank you!
            </h1>

            <p>
              Your order has been placed successfully.
              Our bakery team will contact you shortly
              to confirm your order and delivery details.
            </p>

            <div className="success-details">

              <div>
                <span>
                  Branch
                </span>

                <strong>
                  {selectedBranch?.name || "Punjabi Bistro"}
                </strong>
              </div>


              <div>
                <span>
                  Payment
                </span>

                <strong>
                  Cash on Delivery
                </strong>
              </div>


              <div>
                <span>
                  Total
                </span>

                <strong>
                  ₹{cartTotal}
                </strong>
              </div>

            </div>


            <button
              className="primary-button"
              type="button"
              onClick={() => {
                setCart([]);
                goHome();
              }}
            >
              BACK TO HOME
            </button>

          </section>

        </main>
      )}


      {/* =====================================================
          CART BAR
      ===================================================== */}

      {cart.length > 0 &&
        page !== "checkout" &&
        page !== "success" && (

          <div className="cart-bar-new">

            <div>

              <strong>
                {cartCount}{" "}
                {cartCount === 1
                  ? "item"
                  : "items"}
              </strong>

              <span>
                ₹{cartTotal}
              </span>

            </div>


            <button
              className="primary-button"
              type="button"
              onClick={openCheckout}
            >
              VIEW CART →
            </button>

          </div>

        )}


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer-new">

        <div className="footer-main">

          <div className="footer-brand">

            <div className="footer-logo">
              PB
            </div>

            <div>

              <strong>
                Punjabi Bistro
                <br />
                & Bakery
              </strong>

              <span>
                Eggless bakery • Freshly baked
              </span>

            </div>

          </div>


          <div className="footer-column">

            <h3>
              Explore
            </h3>

            <button
              type="button"
              onClick={goHome}
            >
              Home
            </button>

            <a href="#branches">
              Branches
            </a>

            <a href="#bestsellers">
              Bestsellers
            </a>

            <a href="#about">
              Our Story
            </a>

          </div>


          <div className="footer-column">

            <h3>
              Our branches
            </h3>

            <button
              type="button"
              onClick={() =>
                chooseBranch(branches[0])
              }
            >
              Dharamkot
            </button>

            <button
              type="button"
              onClick={() =>
                chooseBranch(branches[1])
              }
            >
              Zira
            </button>

          </div>


          <div className="footer-column">

            <h3>
              Follow us
            </h3>

            <a
              href="https://www.instagram.com/punjabibistro/"
              target="_blank"
              rel="noreferrer"
              className="footer-instagram"
            >

              <InstagramIcon />

              <span>
                @punjabibistro
              </span>

            </a>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 Punjabi Bistro & Bakery.
            All rights reserved.
          </span>

          <div className="footer-legal">

            <button
              type="button"
              onClick={() =>
                alert(
                  "Privacy Policy: This website collects only the information required to process and deliver your order. Your information is not intentionally sold or shared for advertising."
                )
              }
            >
              Privacy Policy
            </button>

            <button
              type="button"
              onClick={() =>
                alert(
                  "Terms & Conditions: Orders are subject to product availability, delivery area and confirmation by Punjabi Bistro & Bakery."
                )
              }
            >
              Terms & Conditions
            </button>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default App;