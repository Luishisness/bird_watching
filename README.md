bird_watching
=============

applied internet tech-bird watching assignment


Overview
Description
Create a bird watching site called The Busy Birder. You'll explore the following concepts along the way:

serving static files
handling forms
sessions
You'll be creating 3 pages (2 of them allow form submission):

home - /: the first page on the site; links to the list and settings pages
list - /birds: lists all of the birds seen so far, as well as the number of times they've been seen. also allows submission of bird sighting (by anyone!)
settings - /settings: controls the minimum number of birds seen on the list page… this is configured per session
Example Interaction
the busy birder

Submission Process
You will be given access to a private repository on GitHub. Create a file called app.js when you clone it.

The final version of your assignment should be in GitHub, but a submission should still be sent via NYU Classes.

Push your changes to the homework repository on GitHub.
Add the URL of the repository to your assignment submission in NYU Classes.
Commits later than that date will be handled on a case-by-case basis.
24 hour grace period where NYU Classes is still open.
After that, no late homeworks will be accepted.
(3 points) Make at Least 4 Commits
Commit multiple times throughout your development process.
Make at least 3 separate commits - (for example, one option may be to make one commit per part in the homework).
Part 1 - Setup
(2 points) Installing Dependencies
create a package.json
install the following dependencies (make sure you use the --save option), and no others:
body-parser
express
express-handlebars
express-session
(2 points) .gitignore
create a .gitignore
ignore the following files:
node_modules
DS_Store (if you're on OSX)
Part 2 - Homepage and Static Files
(3 points) Enabling Static Files
First, lets make sure we can serve up static content, like css and images.

create the following directory structure in your project's root directory
public
public/css
public/img
add a blank css file in public/css/base.css
add an in image of a bird inpublic/img/bird.png
create a basic express application called app.js; you don't have to define any routes yet…
just add the appropriate requires and middleware to enable static file serving:
check out the slides on serving static files with Express
or see page 26 in Chapter 3 of Web Development With Node & Express
test that both the css files and image work
for example, try to curl http://localhost:3000/img/bird.png
or go that url in your browser
(4 points) Creating a Home Page
Now that static files are set, create a homepage.

the homepage should field GET requests on the path, /

set up handlebars - these slides may help, or read page 24 in Chapter 3 or skim Chapter 7 in Web Development With Node & Express)
get all the requirements and config setup
create the appropriate views/templates and layout
views
views/layouts
in your main.handlebars, drop in the surrounding html that will go on every page
pull in your base.css stylesheet
include an h1 on every page… the header on every page should say The Busy Birder
don't forget body, surrounded by triple curly braces!
in your template for your homepage (call this whatever you want… just make sure you can pull it up later), add the following:
an h3 header with some welcome text
an image of a bird
a link to a settings page (settings)
a link to list of birds page (birds)
create the appropriate route so that a GET request pulls up the page
add some css to change background color, font color and font family
Here's an example of what the page could look like (you don't have to use the same exact styles, but add enough styles so that you can see that it's being pulled up correctly):

homepage

The Bird List Page and Bird Submission Form
The bird list page will list names of birds along with the number of times they've been seen. By default, this list will start with some content:

3 x Bald Eagle
7 x Yellow Billed Duck
4 x Great Cormorant
This page will also allow you to submit the name of a bird that you saw. This will either:

increment the quantity of birds seen if there's a bird with the same name already on the list
add a new name to the list, with a quantity of one
Part 3 - List of Bird Sightings
(3 points) Middleware and Logging
First, get some logging together so that you can troubleshoot. Log out the request that you receive, including the request's body.

require the body-parser middleware and use it; this will allow you to access the content of the request's body
set up some logging using your own middleware function; it should include
the request method and path
followed by the contents of the request body
maintain a list of birds (can be a global variable)
(6 points) Bird List
Now for some actual content. This page will display the names of birds and the number of times they've been seen.

Bootstrap the list with some data.

store all of the birdwatching data in a global Array of objects…
each object has two properties:
a bird's name
the number of times they've been seen
it should start off with:
3 x Bald Eagle
7 x Yellow Billed Duck
4 x Great Cormorant
(This isn't really good practice, but we'll have to store the data somewhere for now!)
Create the actual page…

the list page should field GET requests on the path, /birds
set up the template and routes appropriately; remember to render the template with the correct context
in the template, you can iterate through the list of birds using the #each helper
put each quantity/name pair in a list item (li)
additionally, make the quantity a different color than the name
add a link to a settings page (settings)
finally, and an h3 header with text indicating that this is the bird sightings page
Test your page.

it should look a little like the image below
(ignore the form for now… you'll set that up next)
list

(8 points) Bird Form
Once it's working, create a form…

add a form beneath the list of birds
it should have a text input(name it appropriately… you'll see that name in the request body!)
…as well as a submit input
the form's method should be POST
the action should be empty string "" or birds (it's POSTing to itself)
modify app.js… add a route so that it accepts POST requests on /birds
in your callback function for this route…
use the bird name that was passed in from the form (it should be in the request's body)…
to search the current list of birds for an entry with the same name as what is the request's body
if it exists, add one to it
if it doesn't, create an object for it, with quantity one, and add it to the list
…after that, redirect back to /birds with a GET request
the log should look something like this:
GET the list page.

GET /birds
=====
req.body: {}
POST the form (notice the body).

POST /birds
=====
req.body: { name: 'Ostrich', add: 'Add Another Bird' }
GET the list page again.

GET /birds
=====
req.body: {}
Part 4 - Settings Page, Filtering With a Session Value
This last bit may be tricky. This feature will allow users with different sessions to optionally set a minimum value of sightings that determines which birds will be displayed on the list when they view the list page.

For example, if the threshold is set to 4, only birds that have been sighted 4 times or more will show up on the list for them. You can try using two browser to test this out (setting the min on one will not affect the other).

(6 points) Session Setup
First, setup and configure sessions:

bring in the session module by requiring express-session
set up a some options for your session:

var sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUninitialized: true
};
then use those options for session handling middleware: app.use(session(sessionOptions));
Modify your list route so that it only displays birds that have been sighted for a minimum number of times.

create a new list based off of the session value as the threshold: req.session.yourMinimumValueVariable (you can just loop or use a higher order function)
pass this to your list template for /birds rather than the unfiltered version
(8 points) The Settings Page
Create a form to set the minumum value.

the settings page should field GET requests on the path, /settings
add a link to a list page (birds)
add an h3 header with text indicating that this is the settings page
add a form to your settings page
it should have a text input(name it appropriately… you'll see that name in the request body!)
…as well as a submit input
the form's method should be POST
the action should be empty string "" or settings (it's POSTing to itself)
modify app.js… add a route so that it accepts POST requests on /settings
in your callback function for this route…
create a session variable from the number that was passed in from the form
redirect to the list page so you can see the new filtered results (/birds)
it may also be good to log the value of your session variable for troubleshooting
modify the GET version of the page so that if the session value for the minimum is set, the text input in the form should be pre-filled with that value (see the image below)
the page should look like:
settings

The log should look something like this:

GET the settings page.


GET /settings
=====
req.body: {}
req.session.minVal: undefined
POST the form…


POST /settings
=====
req.body: { minVal: '2', add: 'Set It!' }
req.session.minVal: undefined
GET the list page to show the filtered results


GET /birds
=====
req.body: {}
req.session.minVal: 2
Test the session management.

open your app with one browser… and set a minimum threshold
open your app in another browser
check that the filter is not applied