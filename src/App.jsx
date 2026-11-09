
import { useState, useEffect } from "react";
import "./App.css";

const STORAGE_KEY = "vowmemories-wishes";

// Safely load saved wishes from the browser
function loadWishes() {
  try {
    const savedWishes = localStorage.getItem(STORAGE_KEY);
    return savedWishes ? JSON.parse(savedWishes) : [];
  } catch (error) {
    console.error("Unable to load saved messages:", error);
    return [];
  }
}

function saveWishes(wishes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
}

function App() {
  const isMC = window.location.pathname === "/mc";

  
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [wishes, setWishes] = useState(loadWishes);

  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("classic");

  const approvedWishes = wishes.filter(
    (wish) => wish.approved === true
  );

  const pendingWishes = wishes.filter(
    (wish) => wish.approved !== true
  );

  
  const filteredWishes = approvedWishes;

  const currentWish =
    filteredWishes.length > 0
      ? filteredWishes[currentWishIndex % filteredWishes.length]
      : null;

  function handlePreview() {
    if (!guestName.trim() || !message.trim()) {
      window.alert("Please enter your name and message.");
      return;
    }

    setSuccess(false);
    setShowPreview(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!showPreview) {
      handlePreview();
      return;
    }

     if (!guestName.trim() || !message.trim()) {
      window.alert("Please enter your name and message.");
      setShowPreview(false);
      return;
    }

    const newWish = {
      id: Date.now(),
      guestName: guestName.trim(),
      message: message.trim(),
      approved: false,
      date: new Date().toISOString(),
    };

    const updatedWishes = [...wishes, newWish];

    setWishes(updatedWishes);
    saveWishes(updatedWishes);

    setGuestName("");
    setMessage("");
    setShowPreview(false);
    setSuccess(true);
  }
   
  function handleApprove(wishId) {
    const updatedWishes = wishes.map((wish) =>
      wish.id === wishId
        ? { ...wish, approved: true }
        : wish
    );

       setWishes(updatedWishes);
    saveWishes(updatedWishes);
  }

  function handleReject(wishId) {
    const updatedWishes = wishes.filter(
      (wish) => wish.id !== wishId
    );

    setWishes(updatedWishes);
    saveWishes(updatedWishes);
  }

  function showPreviousWish() {
    if (filteredWishes.length === 0) return;

    setCurrentWishIndex(
      (previousIndex) =>
        (previousIndex - 1 + filteredWishes.length) %
        filteredWishes.length
    );
  }

   function showNextWish() {
    if (filteredWishes.length === 0) return;

    setCurrentWishIndex(
      (previousIndex) =>
        (previousIndex + 1) % filteredWishes.length
    );
  }

  useEffect(() => {
    if (isPaused || filteredWishes.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentWishIndex(
        (previousIndex) =>
          (previousIndex + 1) % filteredWishes.length
      );
    }, 5000);

      return () => clearInterval(timer);
  }, [isPaused, filteredWishes.length]);

  useEffect(() => {
    function syncWishes(event) {
      if (event.key === STORAGE_KEY) {
        setWishes(loadWishes());
      }
    }

    window.addEventListener("storage", syncWishes);
    return () => window.removeEventListener("storage", syncWishes);
  }, []);

  return (
    <div className="app">

      <header className="navbar">
        <a href="/" className="logo">
          VowMemories<span>.</span>
        </a>

        {!isMC && (
          <nav aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#how-it-works">How it works</a>
            <a href="#send-wish">Share a Wish</a>
          </nav>
        )}
      </header>

      {isMC && (
        <main className="mc-page">

          <section
            className={`slideshow-section theme-${selectedTheme}`}
            id="live-display"
          >

            <div className="slideshow-header">
              <div className="slideshow-logo">
                <h1>VowMemories</h1>
              </div>

              <h2>Live Event Messages</h2>

              <p className="live-indicator">
                <span className="live-dot"></span>
                LIVE
              </p>
            </div>

        <div className="theme-selector">
              <label htmlFor="theme">
                Presentation Theme:
              </label>

              <select
                id="theme"
                value={selectedTheme}
                onChange={(event) =>
                  setSelectedTheme(event.target.value)
                }
              >
                <option value="classic">Classic Ivory</option>
                <option value="champagne">Champagne Gold</option>
                <option value="sage">Sage Elegance</option>
              </select>
            </div>

            <div className="slideshow-card">
              {currentWish ? (
                <>
                  <span className="slideshow-heart">
                  </span>

                  <p className="wish-label">
                    A MESSAGE OF LOVE
                  </p>   

                 <h3>{currentWish.guestName}</h3>

                  <span className="wish-divider"></span>

                  <p className="slideshow-message">
                    "{currentWish.message}"
                  </p>

                  <small>
                    A message for this celebration
                  </small>
                </>
              ) : (
                <p>
                  Approved messages will appear here once they
                  are ready to be shared.
                </p>
              )}
            </div>

            <div className="message-counter">
              <span>
                Message{" "}
                {filteredWishes.length > 0
                  ? (currentWishIndex % filteredWishes.length) + 1
                  : 0}
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
                    aria-label={
                      isPaused
                        ? "Resume slideshow"
                        : "Pause slideshow"
                    }
                  >
                    <span className="button-play-icon">
                      {isPaused ? "▶" : "Ⅱ"}
                    </span>

                    <span>
                      {isPaused ? "Resume" : "Pause"}
                    </span>
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
                    onClick={() => {
                      const display = document.getElementById(
                        "live-display"
                      );

                      if (
                        display &&
                        display.requestFullscreen
                      ) {
                        display.requestFullscreen();
                      }
                    }}
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
                {showControls
                  ? "Hide Controls"
                  : "Show Controls"}
              </button>

            </div>  


      <div className="slideshow-footer">
              <p>VOWMEMORIES . CELEBRATING MOMENTS</p>
            </div>

          </section>

          <section className="saved-wishes">

            <div className="dashboard-heading">
              <p className="eyebrow">EVENT MANAGEMENT</p>

              <h2>Messages Dashboard</h2>

              <p>
                Review guest messages and choose which ones
                will appear during the event.
              </p>
            </div>

            <div className="wish-summary">

              <div className="summary-card">
                <h3>{wishes.length}</h3>
                <p>Total Messages</p>
              </div>  

               <div className="summary-card">
                <h3>{pendingWishes.length}</h3>
                <p>Awaiting Approval</p>
              </div>

              <div className="summary-card">
                <h3>{approvedWishes.length}</h3>
                <p>Approved Messages</p>
              </div>

            </div>

            <div className="pending-section">

              <h3>
                Messages Awaiting Approval ({pendingWishes.length})
              </h3>

              {pendingWishes.length === 0 ? (
                <p>No messages are waiting for approval.</p>
              ) : (
                pendingWishes.map((wish) => (
                  <div className="wish-card" key={wish.id}>

                    <h4>{wish.guestName}</h4>

                    <p>{wish.message}</p>


                    <div className="moderation-buttons">

                      <button
                        type="button"
                        onClick={() => handleApprove(wish.id)}
                      >
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReject(wish.id)}
                      >
                        Reject
                      </button>

                    </div>

                  </div>
                ))
              )}

            </div>

            <div className="approved-section">

              <h3>
                Approved Messages ({approvedWishes.length})
              </h3>

              <p>
                These approved messages are ready for the slideshow.
              </p>

              {filteredWishes.length === 0 ? (
                <p>
                  No approved messages yet.
                </p>
              ) : (
                filteredWishes.map((wish) => (
                  <div className="wish-card" key={wish.id}>

                    <h4>{wish.guestName}</h4>

                    <p>{wish.message}</p>


                  </div>
                ))
              )}

            </div>

          </section>

        </main>
      )}
    

    {!isMC && (
        <main>

          <section className="hero" id="home">

            <p className="eyebrow">
              A MOMENT WORTH REMEMBERING
            </p>

            <h1 className="hero-title">
              <span>Your words deserve</span>

              <span className="hero-highlight">
                to be remembered.
              </span>
            </h1>

            <p className="hero-description">
              Every celebration creates beautiful memories.
              Leave a heartfelt message that can be treasured
              long after the special day.
            </p>


            <div className="hero-buttons">

              <a href="#send-wish" className="primary-button"
              >
                Leave a Message
              </a>

              <a
                href="#how-it-works"
                className="secondary-button"
              >
                Discover VowMemories
              </a>

            </div>

            <div className="hero-note">
              <span></span>
              A guestbook for messages, memories, and meaningful moments.
            </div>

          </section>

          <section className="how-section" id="how-it-works" >

            <p className="eyebrow">
              A MEMORY IN THREE SIMPLE STEPS
            </p>

            <h2>Make your words part of the celebration</h2>

            <p>
              Share a message, preview your words, and leave
              something meaningful for the host to remember.
            </p>


            <div className="steps-grid">
              <div className="step-card">
                <span className="step-number">01</span>
                <h3>Write Your Message</h3>
                <p>
                  Share your name and write a heartfelt
                  message.
                </p>
              </div>


              <div className="step-card">
              <span className="step-number">02</span>
              <h3>Preview & Submit</h3>
              <p>
                  Read through your message before submitting.</p>
              </div>


              <div className="step-card">
              <span className="step-number">03</span>
              <h3>Make It Memorable</h3>
                <p>
                 Your message can be shared during the event once approved.
                </p>
              </div>
            </div>
          </section>

<section className="wish-section" id="send-wish">
          <p className="eyebrow">A NOTE FROM THE HEART</p>

            <h2>Leave a beautiful memory</h2>

            <p>
              Take a moment to share your thoughts and good wishes.
            </p>

            <form className="wish-form" onSubmit={handleSubmit}>
              {!showPreview ? (
                <>
            <label htmlFor="guest-display-name"> Your name</label>

<input
                    id="guest-display-name"
                    type="text"
                    placeholder="How should we address you?"
                    autoComplete="name"
                    value={guestName}
                    onChange={(event) => {
                      setGuestName(event.target.value);
                      setSuccess(false);
                    }}
                    required
                  />

                  <label htmlFor="message">Your message</label>

                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write something meaningful..."
                    rows="5"
                    maxLength={500}
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      setSuccess(false);
                    }}
                     required
                  />

                  <div className="character-counter" aria-live="polite">
                    {message.length} / 500 characters
                  </div>

                  <button
                    type="button"
                    className="submit-button"
                    onClick={handlePreview}
                  >
                    Preview Your Message
                  </button>

                </>
              ) : (

                <div className="wish-preview">
                <p className="eyebrow">YOUR MESSAGE</p>
                <h3>A little something for you</h3>

               <p><strong>From:</strong> {guestName}</p>

              <p className="preview-message">{message}</p>

             <div className="preview-actions">
                  <button
                    type="button"
                    onClick={() => setShowPreview(false)}
                  >
                    Edit Message
                  </button>

            <button type="submit" className="submit-button">
             Submit Message
             </button>
            </div>
            </div>

            )}

              {success && (
                <div className="success-message" role="status">
                  <h3>Thank you for sharing!</h3>
                  <p>
                    Your message has been received and is waiting
                    for the event team to review it. Thank you for
                    being part of this special moment.
                </p>
                </div>
              )}
            </form>
          </section>
        </main>
      )}

      <footer>
        <p>VowMemories © 2026. Made for meaningful moments.</p>
      </footer>

    </div>
  );
}

export default App;