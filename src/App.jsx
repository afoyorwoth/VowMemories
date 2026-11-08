import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const isMC = window.location.pathname === "/mc";
  const [guestName, setGuestName] = useState("");
  const [recipient, setRecipient] = useState("Couple");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false)
  const [wishes, setWishes] = useState(() => {
    return JSON.parse(localStorage.getItem("vowmemories-wishes") || "[]");
  });
  const [selectedRecipient, setSelectedRecipient] = useState("All");
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("classic");

  function handleSubmit(event) {
    event.preventDefault();

    const newWish = {
      id: Date.now(),
      guestName,
      recipient,
      message,
      approved: false,
      date: new Date().toISOString(),
    };

    const savedWishes = JSON.parse(
      localStorage.getItem("vowmemories-wishes") || "[]",
    );

    savedWishes.push(newWish);
    setWishes(savedWishes);

    localStorage.setItem("vowmemories-wishes", JSON.stringify(savedWishes));

    setGuestName("");
    setRecipient("Couple");
    setMessage("");
    setSuccess(true);
    setShowPreview(false);
  }
  
  const filteredWishes =
  selectedRecipient === "All"
    ? wishes.filter((wish) => wish.approved === true)
    : wishes.filter(
        (wish) =>
          wish.recipient === selectedRecipient &&
          wish.approved === true
      );

      const pendingWishes = wishes.filter(
  (wish) => wish.approved !== true
);

  const currentWish =
    filteredWishes.length > 0
      ? filteredWishes[currentWishIndex % filteredWishes.length]
      : null;

  function showPreviousWish() {
    if (filteredWishes.length === 0) return;

    setCurrentWishIndex(
      (currentWishIndex - 1 + filteredWishes.length) % filteredWishes.length,
    );
  }

  function showNextWish() {
    if (filteredWishes.length === 0) return;

    setCurrentWishIndex((currentWishIndex + 1) % filteredWishes.length);
  }

  useEffect(() => {
    if (isPaused || filteredWishes.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentWishIndex(
        (previousIndex) => (previousIndex + 1) % filteredWishes.length,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, filteredWishes.length]);

  return (
    <div className="app">
      <header className="navbar">
        <a href="/" className="logo">
          VowMemories<span>.</span>
        </a>

        {!isMC && (
          <nav>
            <a href="#home">Home</a>
            <a href="#how-it-works">How it works</a>
            <a href="#send-wish">Share a Wish</a>
          </nav>
        )}
      </header>

      {isMC && (
        <>

<section
  className={`slideshow-section theme-${selectedTheme}`}
  id="live-display"
>
  <div className="slideshow-header">
    <div className="slideshow-logo">
      <h1>VowMemories</h1>
    </div>

    <h2>Live Wedding Wishes</h2>

    <p className="live-indicator">
      <span className="live-dot"></span>
      LIVE 
    </p>
  </div>

    <div className="theme-selector">
    <label htmlFor="theme">Presentation Theme:</label>

    <select
      id="theme"
      value={selectedTheme}
      onChange={(e) => setSelectedTheme(e.target.value)}
    >
      <option value="classic">Classic Ivory</option>
      <option value="champagne">Champagne Gold</option>
      <option value="sage">Sage Elegance</option>
    </select>
  </div>
  
  <div className="slideshow-card">
    {currentWish ? (
      <>
        <span className="slideshow-heart"></span>
        <p className="wish-label">A MESSAGE OF LOVE</p>
        <h3>{currentWish.guestName}</h3>
        <span className="wish-divider"></span>
        <p className="slideshow-message">
          "{currentWish.message}"
        </p>
        <small>With love, for {currentWish.recipient}</small>
      </>
    ) : (
      <p>Wedding wishes will appear here.</p>
    )}
  </div>

  <div className="message-counter">
  <span>
    Message {filteredWishes.length > 0 ? currentWishIndex % filteredWishes.length + 1 : 0}
  </span>
  <span className="counter-divider">/</span>
  <span>{filteredWishes.length}</span>
</div>

  <div className="slideshow-controls">

{showControls && (
  <>
<button
  type="button"
  className="slide-control"
  onClick={showPreviousWish}
  disabled={filteredWishes.length === 0}
  aria-label="Previous wish"
>
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5" />
    <path d="m12 5-7 7 7 7" />
  </svg>

  <span>Previous</span>
</button>

<button
  type="button"
  className="slide-control pause-control"
  onClick={() => setIsPaused(!isPaused)}
  disabled={filteredWishes.length === 0}
  aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
>
  <span className="button-play-icon">
    {isPaused ? "▶" : "Ⅱ"}
  </span>
  <span>{isPaused ? "Resume" : "Pause"}</span>
</button>

   <button
  type="button"
  className="slide-control"
  onClick={showNextWish}
  disabled={filteredWishes.length === 0}
  aria-label="Next wish"
>
  <span>Next</span>

  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
</button>

    <button
      type="button"
      onClick={() =>
        document.getElementById("live-display").requestFullscreen()
      }
    >
      <span>⛶</span> Full Screen
    </button>
  </>
)}
<button
  type="button"
  className="slide-control"
  onClick={() => setShowControls(!showControls)}
  aria-expanded={showControls}
>
  {showControls ? "Hide Controls" : "Show Controls"}
</button>
  </div>

  <div className="slideshow-footer">
    <p>VOWMEMORIES . CELEBRATING LOVE</p>
  </div>
</section>

          <section className="saved-wishes">
            <h3>Saved Wedding Wishes</h3>
            <h3>Wishes Awaiting Approval ({pendingWishes.length})</h3>
            {pendingWishes.length === 0 ? (
  <p>No wishes are waiting for approval.</p>
) : (
  pendingWishes.map((wish) => (
    <div className="wish-card" key={wish.id}>
      <h4>{wish.guestName}</h4>
      <p>{wish.message}</p>
      <small>{wish.recipient}</small>

      <div className="moderation-buttons">
        <button
          onClick={() => {
            const updatedWishes = wishes.map((item) =>
              item.id === wish.id
                ? { ...item, approved: true }
                : item
            );

            setWishes(updatedWishes);
            localStorage.setItem(
              "wishes",
              JSON.stringify(updatedWishes)
            );
          }}
        >
          Approve
        </button>

        <button
          onClick={() => {
            const updatedWishes = wishes.filter(
              (item) => item.id !== wish.id
            );

            setWishes(updatedWishes);
            localStorage.setItem(
              "wishes",
              JSON.stringify(updatedWishes)
            );
          }}
        >
          Reject
        </button>
      </div>
    </div>
  ))
)}

            <div className="collection-buttons">
              <button
                onClick={() => {
                  setSelectedRecipient("All");
                  setCurrentWishIndex(0);
                }}
              >
                All Wishes
              </button>

              <button
                onClick={() => {
                  setSelectedRecipient("Bride");
                  setCurrentWishIndex(0);
                }}
              >
                Bride
              </button>

              <button
                onClick={() => {
                  setSelectedRecipient("Groom");
                  setCurrentWishIndex(0);
                }}
              >
                Groom
              </button>

              <button
                onClick={() => {
                  setSelectedRecipient("Couple");
                  setCurrentWishIndex(0);
                }}
              >
                Couple
              </button>
            </div>

            {filteredWishes.length === 0 ? (
              <p>No wishes have been shared yet.</p>
            ) : (
              filteredWishes.map((wish) => (
                <div className="wish-card" key={wish.id}>
                  <h4>{wish.guestName}</h4>
                  <p>{wish.message}</p>
                  <small>{wish.recipient}</small>
                </div>
              ))
            )}
          </section>
        </>
      )}

      {!isMC && (
        <main>
          <section className="hero" id="home">
            <p className="eyebrow">A DAY WORTH REMEMBERING</p>

            <h1>
              Leave a message
              <br />
              <span>they will treasure.</span>
            </h1>

            <p className="hero-description">
              Wedding days fly by, and not everyone gets a moment with the
              couple. Leave them a message they can read and treasure long after
              the celebrations.
            </p>

            <div className="hero-buttons">
              <a href="#send-wish" className="primary-button">
                Send your wishes
              </a>

              <a href="#how-it-works" className="secondary-button">
                Discover VowMemories
              </a>
            </div>

            <div className="hero-note">
              <span></span> A guestbook filled with love.
            </div>
          </section>

          <section className="how-section" id="how-it-works">
            <p className="eyebrow">MORE THAN A GUESTBOOK</p>
            <h2>Your message belongs in their story</h2>
            <p>
              Leave the couple a message they can look back on whenever they
              want to remember this day.
            </p>
          </section>

          <section className="wish-section" id="send-wish">
            <p className="eyebrow">LEAVE A LOVING MESSAGE</p>
            <h2>Send your wedding wishes</h2>
            <p>Share a heartfelt message with the happy couple.</p>

<form className="wish-form" onSubmit={handleSubmit}>
  {!showPreview ? (
    <>
     <label htmlFor="guest-display-name">Your name</label>
<input
  id="guest-display-name"
  name="guest-display-name"
  type="text"
  placeholder="Enter your name"
  autoComplete="new-password"
  value={guestName}
  onChange={(event) => setGuestName(event.target.value)}
  required
/> 

      <label htmlFor="recipient">Who is your message for?</label>
      <select
        id="recipient"
        value={recipient}
        onChange={(event) => setRecipient(event.target.value)}
      >
        <option value="Bride">Bride</option>
        <option value="Groom">Groom</option>
        <option value="Couple">Both, the happy couple</option>
      </select>

      <label htmlFor="message">Your wedding wish</label>
      <textarea
        id="message"
        placeholder="Write your beautiful message here..."
        rows="5"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />

      <button
        type="button"
        className="submit-button"
        onClick={() => {
          if (guestName.trim() && message.trim()) {
            setShowPreview(true)
          } else {
            alert('Please enter your name and wedding wish first.')
          }
        }}
      >
        Preview Your Wish
      </button>
    </>
  ) : (
    <div className="wish-preview">
      <h3>Preview Your Wedding Wish</h3>

      <p><strong>From:</strong> {guestName}</p>
      <p><strong>To:</strong> {recipient}</p>
      <p><strong>Your message:</strong></p>
      <p>{message}</p>

      <button
        type="button"
        onClick={() => setShowPreview(false)}
      >
        Edit Message
      </button>

      <button type="submit" className="submit-button">
        Submit Wish
      </button>
    </div>
  )}

  {success && (
    <p className="success-message" role="status">
      Thank you! Your beautiful wish has been received.
    </p>
  )}
</form>
          </section>
        </main>
      )}

      <footer>
        <p>VowMemories © 2026. Made with love.</p>
      </footer>
    </div>
  );
}

export default App;
