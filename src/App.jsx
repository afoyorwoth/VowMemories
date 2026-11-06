import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [guestName, setGuestName] = useState('')
  const [recipient, setRecipient] = useState('Couple')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const [wishes, setWishes] = useState(() => {
  return JSON.parse(
    localStorage.getItem('vowmemories-wishes') || '[]'
  )
})
const [selectedRecipient, setSelectedRecipient] = useState('All')
const [currentWishIndex, setCurrentWishIndex] = useState(0)
const [isPaused, setIsPaused] = useState(true)

  function handleSubmit(event) {
    event.preventDefault()

    const newWish = {
      id: Date.now(),
      guestName,
      recipient,
      message,
      approved: false,
      date: new Date().toISOString()
    }

    const savedWishes = JSON.parse(
      localStorage.getItem('vowmemories-wishes') || '[]'
    )

    savedWishes.push(newWish)
    setWishes(savedWishes)

    localStorage.setItem(
      'vowmemories-wishes',
      JSON.stringify(savedWishes)
    )

    setGuestName('')
    setRecipient('Couple')
    setMessage('')
    setSuccess(true)
  }
  const filteredWishes =
  selectedRecipient === 'All'
    ? wishes
    : wishes.filter(
        (wish) => wish.recipient === selectedRecipient
      )

      const currentWish =
  filteredWishes.length > 0
    ? filteredWishes[currentWishIndex % filteredWishes.length]
    : null

    function showPreviousWish() {
  if (filteredWishes.length === 0) return

  setCurrentWishIndex(
    (currentWishIndex - 1 + filteredWishes.length) %
    filteredWishes.length
  )
}

function showNextWish() {
  if (filteredWishes.length === 0) return

  setCurrentWishIndex(
    (currentWishIndex + 1) % filteredWishes.length
  )
}

    useEffect(() => {
  if (isPaused || filteredWishes.length <= 1) {
    return
  }

  const timer = setInterval(() => {
    setCurrentWishIndex((previousIndex) =>
      (previousIndex + 1) % filteredWishes.length
    )
  }, 5000)

  return () => clearInterval(timer)
}, [isPaused, filteredWishes.length])

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="logo">
          VowMemories<span>.</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#how-it-works">How it works</a>
         <a href="#send-wish">Share a Wish</a>
        </nav>
      </header>

      <section className="slideshow-section" id="live-display">
  <p className="eyebrow">THE WEDDING CELEBRATION</p>
  <h2>Live Wedding Wishes</h2>
  <p>Beautiful words to treasure forever.</p>

  <div className="slideshow-card">
    {currentWish ? (
      <>
        <span className="slideshow-heart"></span>
        <h3>{currentWish.guestName}</h3>
        <p className="slideshow-message">
          "{currentWish.message}"
        </p>
        <small>With love, for {currentWish.recipient}</small>
      </>
    ) : (
      <p>Wedding wishes will appear here.</p>
    )}
  </div>

 
<div className="slideshow-controls">
  <button
    onClick={showPreviousWish}
    disabled={filteredWishes.length === 0}
  >
    Previous
  </button>

  <button
    className="next-button"
    onClick={showNextWish}
    disabled={filteredWishes.length === 0}
  >
    Next Wish 
  </button>

  <button onClick={() => setIsPaused(!isPaused)}>
    {isPaused ? 'Resume Slideshow' : 'Pause Slideshow'}
  </button>

  <button
    onClick={() =>
      document.getElementById('live-display').requestFullscreen()
    }
  >
    Full Screen
  </button>
</div>
 
</section>

      <main>
        <section className="hero" id="home">
          <p className="eyebrow">A DAY WORTH REMEMBERING</p>

          <h1>
            Leave a message
            <br />
            <span>they will treasure.</span>
          </h1>

          <p className="hero-description">
            From family and friends, every message becomes part of their wedding story.
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
           Leave the couple a message they can look back on whenever
           they want to remember this day.
          </p>
        </section>

        <section className="wish-section" id="send-wish">
          <p className="eyebrow">LEAVE A LOVING MESSAGE</p>
          <h2>Send your wedding wishes </h2>
          <p>
            Share a heartfelt message with the happy couple.
          </p>

          <form className="wish-form" onSubmit={handleSubmit}>
            <label htmlFor="guestName">Your name</label>
            <input
              id="guestName"
              type="text"
              placeholder="Enter your name"
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

            <button type="submit" className="primary-button">
              Send my wishes 
            </button>

            {success && (
              <p className="success-message" role="status">
                Thank you, Your beautiful wish has been saved. 
              </p>
            )}           
          </form>

          <div className="saved-wishes">
  <h3>Saved Wedding Wishes</h3>

  <div className="collection-buttons">
  <button onClick={() => setSelectedRecipient('All')}>
    All Wishes
  </button>

  <button onClick={() => setSelectedRecipient('Bride')}>
    Bride
  </button>

  <button onClick={() => setSelectedRecipient('Groom')}>
    Groom
  </button>

  <button onClick={() => setSelectedRecipient('Couple')}>
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
        <small> {wish.recipient}</small>
      </div>
    ))
  )}
</div>
        </section>
      </main>

      <footer>
        <p>VowMemories © 2026. Made with love </p>
      </footer>
    </div>
  )
}

export default App
