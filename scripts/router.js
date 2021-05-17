// router.js

history.pushState("home", "", '#home');

export const router = {};

var state = 'home';

const gear_button = document.querySelector("[alt = 'settings']");
gear_button.addEventListener('click', function () {
  if (state != 'settings') {
    router.setState("settings");
  } else if (state == 'settings') {
    router.setState("home");
  }
});





function toggleSettings() {
  console.log(state);
  if (state != 'settings') {
    setSettings();
  } else if (state == 'settings') {
    setHome();
  }
}

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function (param1, param2) {
  /**
   * - There are three states that your SPA app will have
   *    1. The home page
   *    2. The entry page (showing one individual entry)
   *    3. The settings page (currently blank, no actual settings here, just a placeholder where a real settings page would go)
   *
   * - If you look at the CSS, we have 2 classes you can add to the body element to help change states, "settings" and "single-entry"
   * - Changing states will require more than just changing these classes, for example the settings page requires you to change the title to "Settings"
   * - And each individual entry the title changes to "Entry #" based on it's number in the entry order
   *
   * - When changing states, make sure the back and forward buttons work. You can use hash URLs (e.g. https://someurl.com/#settings) when changing states
   *   to make things easier.
   * - Similarly, when viewing an individual entry, a hashed URL might look like https://someurl.com/#entry3
   * 
   * - Some tips:
   *    1. Push a new state object to the history object using history.pushState() 
   *    2. look up the documentation for how to use pushState() when you try it
   *    3. look up the documentation for the "popstate" event listener (fires only on back button), useful in your script.js file
   *    4. For each <journal-entry> element, you can grab the JSON version of its info with .entry (e.g. someJournalEntryElement.entry)
   *       a. This is useful when viewing a single entry. You may notice an <entry-page> element in the HTML, this is the element that is displayed when the
   *          .single-entry class is applied to the body. You can populate this element by using .entry similarly. So if I wanted to grab a specific <journal-entry>
   *          and populate it's info into the <entry-page>, I would simply use an assignment of entryPageElement.entry = journalEntryElement.entry
   *       b. Clearing the <entry-page> element of its previous data can be a bit tricky, it might be useful to just delete it and insert a new blank one 
   *          in the same spot each time. Just a thought.
   *
   * - Answers to some questions you may have:
   *    1. You may add as many helper functions in this file as you like
   *    2. You may modify the parameters of setState() as much as you like
   */
  console.log("Setstate from: " + state + " to: " + param1);
  if (param1 == 'settings') {
    toggleSettings();
  } else if (param1 == 'entry') {
    setEntry(param2);
  } else if (param1 == 'home') {
    setHome();
  }
}

var header = document.getElementsByTagName('h1')[0];
var body = document.getElementsByTagName('body')[0];

function setHome() {
  state = 'home';
  body.classList.remove('single-entry');
  body.classList.remove('settings');
  header.innerText = "Journal Entries";
  history.pushState("home", "", '#home');
}


function setEntry(entry) {
  state = 'entry';
  body.classList.add('single-entry');
  body.classList.remove('settings');
  header.innerText = "Entry #" + Math.round(Math.random() * 10);
  history.pushState("entry", "", '#' + entry.title);
  //delete and re-create entry page
  let entry_page = document.getElementsByTagName('entry-page')[0];
  let target = entry_page.parentElement;
  entry_page.remove();
  entry_page = document.createElement("entry-page");
  entry_page.entry = entry;
  target.appendChild(entry_page);
  //console.log(entry);
  //setupEntryPage(entry);


}

function setupEntryPage(entry) {
  header.innerText = entry.title;
  document.getElementsByClassName('entry-title')[0].innerText = entry.title;
  document.getElementsByClassName('entry-date')[0].innerText = entry.date;
  document.getElementsByClassName('entry-content')[0].innerText = entry.content;
}


function setSettings() {
  state = 'settings';
  body.classList.remove('single-entry');
  body.classList.add('settings');
  header.innerText = "Settings";
  history.pushState("settings", "", '#settings');
}

//popstate
window.onpopstate = function (event) {
  console.log("popstate to: " + JSON.stringify(event.state));

  if (document.getElementsByTagName('entry-page')[0] == null) {
    router.setState(event.state, "");
  } else {
    router.setState(event.state, document.getElementsByTagName('entry-page')[0].entry);
  }
};