# VowMemories 

### A Digital Wedding Guestbook

VowMemories is a website where wedding guests can leave messages for the bride and groom, even when they don't get the chance to meet them during the celebration.

The idea came from something that happens at many weddings: the day gets busy, guests are caught up in the celebrations, and some never get a moment to personally share their wishes with the couple.

VowMemories gives them another way to do that.

## 1. The Problem

A wedding day can be very busy. Between the ceremony, photography, entertainment and greeting guests, the bride and groom may not get enough time to interact with everyone.

Some guests leave without sharing their congratulations or personal messages. Others may not get the opportunity to write in a traditional guestbook.

I wanted to create a simple way for those messages to still be shared and kept.

## 2. The Solution

VowMemories allows guests to open a wedding page using a website link or QR code and leave a message for the bride, groom or both.

Before sending, guests can preview their message and make changes if needed.

There is also a separate page for the MC to display the saved wishes during the celebration.

## 3. What the Website Can Do

**Guest page**
- Enter a name.
- Choose Bride, Groom or Couple.
- Write a wedding message.
- Preview the message before submitting.
- Edit the message before sending.
- Receive a confirmation after submission.

**MC page**
- Open a separate presentation page at `/mc`.
- View saved wedding wishes.
- Filter wishes by recipient.
- Move between messages.
- Pause and resume the slideshow.
- Display messages in full-screen mode.

**Other features**
- Responsive design for different screen sizes.
- Wedding photography and an elegant wedding-themed layout.
- QR code for accessing the guest page.
- LocalStorage for saving submitted wishes.

## 4. Tools and Technologies

- HTML5
- CSS3
- JavaScript
- React
- Vite
- Browser LocalStorage

## 5. How to Use VowMemories

**For guests**

1. Open the website using the link or QR code.
2. Enter your name.
3. Choose who the message is for.
4. Write your wedding wish.
5. Click Preview Your Wish.
6. Review it and select Edit Message if you want to make changes.
7. Click Submit Wish when you are ready.

**For the MC**

1. Open the `/mc` page.
2. View the available saved messages.
3. Filter messages by recipient.
4. Use the presentation controls to display them.

- **Automatic Slideshow:** Displays each wedding wish for 5 seconds before moving to the next message.
- **Slideshow Controls:** The MC can pause, resume, and navigate between wishes manually.

## 6. Testing

I tested the following:

- Entering guest details and messages.
- Selecting the intended recipient.
- Previewing messages before submission.
- Editing messages without losing the original text.
- Submitting messages and displaying the confirmation.
- Opening and using the MC page.
- Using the website on a mobile screen.
- Accessing the deployed website.

## 7. Current Limitation

The project currently uses LocalStorage to save messages.

This means wishes are saved in the browser and on the device where they are submitted. They do not automatically appear on another device, including the MC's device.

A shared database and real-time connection have not yet been implemented.

## 8. What I Would Like to Improve

Given more development time, I would like to:

- Connect the website to a shared database.
- Make messages appear on the MC screen in real time.
- Add message moderation.
- Allow couples to download their wedding messages as a PDF.
- Allow guests to include photos or videos.
- Support more than one wedding event.

## 9. Project Links

- **Live website:** https://vow-memories.vercel.app
- **MC page:** https://vow-memories.vercel.app/mc
- **GitHub:** https://github.com/afoyorwoth/VowMemories

## 10. About the Project

VowMemories is my individual frontend development project for the Tech Mentorship Program 2026.

I built it using HTML, CSS, JavaScript and React, with the aim of solving a practical problem through a website.

*VowMemories Every wish deserves to be remembered.*