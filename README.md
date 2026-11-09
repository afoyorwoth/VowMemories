# VowMemories

### A Digital Wedding Guestbook

**Every wish deserves to be remembered.**

VowMemories is a web-based digital wedding guestbook that gives guests an opportunity to share heartfelt messages with a couple, even when they do not get the chance to meet them personally during the celebration.

The idea came from something that happens at many weddings: the day gets busy, guests are caught up in the celebrations, and some leave without sharing their congratulations or personal messages.

VowMemories provides another way for those messages to be shared, reviewed and displayed during the celebration.

## 1. The Problem

A wedding day can be very busy. Between the ceremony, photography, entertainment and greeting guests, the bride and groom may not get enough time to interact with everyone.

Some guests leave without sharing their congratulations or personal messages. Others may not get the opportunity to write in a traditional guestbook.

VowMemories aims to provide a simple digital alternative.

## 2. The Solution

VowMemories allows guests to visit a wedding page and leave personal messages through an online form.

Guests can preview their messages before submitting them. The MC has a separate page where submitted messages can be reviewed, approved or rejected. Approved wishes can then be displayed during the event using a slideshow.

## 3. Key Features

### Guest Page

- Welcoming wedding-themed homepage.
- Guest name and message input fields.
- Message preview before submission.
- Option to edit a message before submitting.
- Submission confirmation.

### MC Dashboard

- View total, pending and approved messages.
- Review submitted messages.
- Approve or reject messages.
- View approved messages.

### MC Presentation Page

- Separate presentation page at `/mc`.
- Display approved messages.
- Automatic slideshow with five-second intervals when playing.
- Previous and next navigation.
- Pause and resume controls.
- Full-screen display option.
- Three presentation themes:
  - Classic Ivory
  - Champagne Gold
  - Sage Elegance

### Additional Features

- Responsive interface for different screen sizes.
- Wedding photography and elegant visual styling.
- LocalStorage for saving messages and moderation changes.

## 4. Technologies Used

- HTML5
- CSS3
- JavaScript
- React
- Vite
- Browser LocalStorage
- Git and GitHub
- Vercel

## 5. How to Use VowMemories

### For Guests

1. Open the guest website.
2. Enter your name.
3. Write your wedding message.
4. Preview your message.
5. Edit it if necessary.
6. Submit your wish.

### For the MC

1. Open the MC page using `/mc`.
2. Review messages in the dashboard.
3. Approve or reject pending messages.
4. Open the presentation view.
5. Display approved wishes using the slideshow controls.
6. Select a preferred presentation theme.

## 6. Testing

The following areas were included in the project's development and testing process:

- Guest name and message input.
- Message preview and editing.
- Message submission and confirmation.
- Saving messages in LocalStorage.
- MC dashboard message summaries.
- Message approval and rejection.
- Approved message display.
- Slideshow navigation and controls.
- Theme selection.
- Responsive layout.
- Production build and deployed website access.

## 7. Current Limitations

The current version uses browser LocalStorage to save messages and moderation changes.

Messages are stored locally on the browser and device being used. They are not automatically synchronised across different devices or browsers.

A shared backend database and real-time connection would be needed for multiple devices to access the same event messages reliably.

## 8. Future Improvements

- Integrate a shared database.
- Enable real-time message synchronisation.
- Add secure MC authentication.
- Support multiple wedding events.
- Allow couples to download their messages as PDF files.
- Allow guests to include photos or videos.
- Add automated data backup and recovery.

## 9. Project Links

- **Live Guest Website:** https://vow-memories.vercel.app/
- **MC Page:** https://vow-memories.vercel.app/mc
- **GitHub Repository:** https://github.com/afoyorwoth/VowMemories

## 10. About the Project

VowMemories is my individual frontend development project for the Tech Mentorship Program 2026.

The project demonstrates how HTML, CSS, JavaScript and React can be used to develop a practical digital solution to a real-life problem.

**VowMemories — Every wish deserves to be remembered.**