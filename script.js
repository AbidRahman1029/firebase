/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();
/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const messagesDiv = document.getElementById("all-messages")
const username = document.getElementById("username")
const message = document.getElementById("message")
const submitbtn = document.getElementById("send-btn")
const email = document.getElementById("email")
submitbtn.onclick = updateDB;
/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */

function updateDB(event) {
  if (username.value.trim() == "" || email.value.trim() == "")
  {
    alert("please enter a username and email")
  }
  const now = new Date()
  const time  = now.toLocaleTimeString()
  const month = now.getMonth()
  const day = now.getDate()
  const year = now.getFullYear()
  fulldate = month + "/" + day + "/" + year



  event.preventDefault()
  let data = {
    "username": username.value,
    "email": email.value, 
    "message": message.value,
    "date": fulldate,
    "time": time
  }

  

  database.push(data)
  message.value = ""
  // Prevent default refresh
  // Create data object
  // console.log the object
  // GET *PUSH* PUT DELETE
  // Write to our database
  // Reset message
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
database.on("child_added", addMessageToBoard)
/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 *
 */

function addMessageToBoard(rowData) {
  let data = rowData.val()
  console.log(data)
  let singleMessage = makeSingleMessageHTML(data.username, data.email, data.message, data.date, data.time)

  messagesDiv.append(singleMessage)

  // Store the value of rowData inside object named 'data'
  // console.log data
  // Create a variable named singleMessage
  // that stores function call for makeSingleMessageHTML()
  // Append the new message HTML element to allMessages
}

/**
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 *
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - returns the parent div
 */

function makeSingleMessageHTML(usernameTxt, emailTxt, messageTxt, dateTxt, timeTxt) {
  let parentDiv = document.createElement("div")
  parentDiv.className = "single-message"
  let usernameP = document.createElement("p")
  usernameP.innerHTML = usernameTxt
  usernameP.className = "single-message-username"
  parentDiv.append(usernameP)

  let emailP = document.createElement("p")
  emailP.innerHTML = emailTxt
  emailP.className = "single-message-email"
  parentDiv.append(emailP)

  let messageP = document.createElement("p")
  messageP.innerHTML = messageTxt
  parentDiv.append(messageP)

  let dateP = document.createElement("p")
  dateP.innerHTML = dateTxt
  dateP.className = "single-message-date"
  parentDiv.append(dateP)

  let timeP = document.createElement("p")
  timeP.innerHTML = timeTxt
  timeP.className = "single-message-time"
  parentDiv.append(timeP)

  return parentDiv
  // Create Parent Div
  // Add Class name .single-message
  // Create Username P Tag
  // Append username
  // Create message P Tag
  // Return Parent Div
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */
