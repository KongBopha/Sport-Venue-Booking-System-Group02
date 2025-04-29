<template>
    <div class="form-container">
      <form class="contact-form">
        <div class="form-row">
          <div class="form-group">
            <input type="text" id="first-name" placeholder=" " required />
            <label for="first-name">First Name</label>
          </div>
          <div class="form-group">
            <input type="text" id="last-name" placeholder=" " required />
            <label for="last-name">Last Name</label>
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <input type="email" id="email" placeholder=" " required />
            <label for="email">Email</label>
          </div>
          <div class="form-group">
            <input type="text" id="phone" placeholder=" " required />
            <label for="phone">Phone Number</label>
          </div>
        </div>
  
        <div class="form-group full-width">
          <textarea id="message" placeholder=" " required></textarea>
          <label for="message">Message</label>
        </div>
  
        <div class="form-action">
          <button type="submit" class="send-btn">
            Send Message
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  // No script
  </script>
  
  <style scoped>
  .contact-form {
    background: #fff;
    padding: 20px;
  }
  .form-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .form-group {
    position: relative;
    flex: 1;
    margin-bottom: 20px;
  }
  input, textarea {
    width: 100%;
    padding: 15px 10px 5px 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: transparent;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
  }
  input:focus, textarea:focus {
    border-color: #008080; /* teal */
  }
  label {
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 14px;
    color: #aaa;
    pointer-events: none;
    transition: all 0.3s ease;
  }
  input:focus ~ label,
  input:not(:placeholder-shown) ~ label,
  textarea:focus ~ label,
  textarea:not(:placeholder-shown) ~ label {
    top: -10px;
    left: 10px;
    background: #fff;
    padding: 0 5px;
    font-size: 12px;
    color: #008080;
  }
  textarea {
    resize: none;
    height: 120px;
  }
  .form-action {
    text-align: right;
  }
  .send-btn {
    background: #008080;
    color: white;
    padding: 12px 30px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .send-btn:hover {
    background: #006666; /* darker teal */
  }
  </style>
  