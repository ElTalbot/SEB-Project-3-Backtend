# General Assembly

### Project 3 (A MERN Stack App)

Project 3 required us bringing together a full stack application that entailed making both the front-end and the backend.

## Concept

Our Minimal Viable Product (MVP) for this project was an Animal Factfile that offered authorisation and permission functionality. This meant members having the ability to add, delete, view and update animal fact cards and non-members only being able to browse a list of animal fact cards.

To implement this authorisation functionality a sign up and login page was also required.

## Link

[Animal Factfile](https://animalsgonewild.netlify.app/)

## Technology Used

### Axios

Used to make the HTTP requests and if successful receive a response that can then be displayed.

### React(JSX)

Used to render and visually display the data fetched from the API eg the animal name, species, continent, conservation status etc.

### Express

Web framework we used to carry out the requests required to fetch the data from our API, we were then able to use their library of mechanisms to respond appropriately to the response.
Further to this we used express to connect to our local port, implement middleware functionality that helped carry out our authorisation function, incorporate error handling and use mongodDb.

### MongoDB

The database management system we used to store and manage our data.

### Font Awesome

This was used to add icons and worked alongside Bulma to include the icons within specific elements such as the input fields.

### Bulma

The integration of Bulma in React meant we were able to utilise this styling framework to build our project.

### Insomnia

Used throughout to ensure our `get`, `put`, `post`, `delete` fetch functions were being called correctly prior to deploying, making sure the API wasn't broken and was displayed with ease.

### Figma

Used to wireframe the design of our project as well as define the potential user journeys.

### GitHub

Setting up individual branches from our newly created GitHub repository meant all three of us were able to collaboratively build the project and then fork and clone it once finished.

### Trello

We used trello to keep track of our progress, each day during stand up we would assign tasks and goals for the day and also review at the end of the day.

## Time Frame

This was a collaborative project, our instructors put us in groups of 3 and gave us a week to complete the project.

## Instructional Team Brief

The brief for this project can be seen in the README below and was designed to consolidate our learnings on APIs, by making both the backend and front-end of a full stack application.

<div style="overflow: auto;">
    <img src="README Assets/README 1.png" alt="Overview and Technical Requirements brief" style="float:left; margin-right:10px;" width="350"/>
    <img src="README Assets/README 2.png" alt="Necessary Deliverables and Ways to Start brief" style="float:left; margin-right:10px;" width="350"/>
    <img src="README Assets/README 3.png" alt="Project Demos brief" style="float:left; margin-right:10px;" width="350"/>
</div>

<br></br>

## Planning, Process and Implementation

### Collaboration

As a group and using the brief we worked together to wireframe, pseudocode and create user stories designed to help guide us in the building of our project - to do this we used figma.
In the images below are our user stories where we defined both the member and a non-member user journeys, this enabled us to create wireframes that depicted both these user experiences also seen here.

<div style="overflow: auto;">
    <img src="README Assets/Wireframes.png" alt="Wireframes" style="float:left; margin-right:10px;" width="500"/>
    <img src="README Assets/UserStories.png" alt="User Stories" style="float:left; margin-right:10px;" width="400"/>
</div>

#### Trello

We used trello to manage and track the progress of the project, with the wireframes and user stories in place we started by listing, prioritising and assigning the tasks

The dynamic list format that trello offers (see below) meant that during our morning stand up and afternoon debrief, we were able to keep up to date with tasks and ensure that all tasks were on track to being completed in time.

![Trello board of tasks](</README Assets/Trello.png>)

### Build/Code Process

#### Foundation

Setting up the foundations of our full stack application was the key start to the process - we did this together to ensure the core foundation were in place prior to us building out the application.

Collaboratively we started by following MVC (Model, View, Controller)

M - Model, we defined the structure of what our data would look like.

V - View, connect insomnia for testing purposes AND build the route declarations eg `router.route("/api/animals").get(getAnimals);`.

C - Controllers, create the files that carries out the functions to be called in the `router.ts`.

<div style="overflow: auto;">
    <img src="README Assets/User Model.png" alt="User models code" style="float:left; margin-right:10px;" width="200"/>
    <img src="README Assets/Insomnia.png" alt="Insomnia data retrieval" style="float:left; margin-right:10px;" width="350"/>
    <img src="README Assets/Controller.png" alt="User Controller Code" style="float:left; margin-right:10px;" width="350"/>
</div>

### Looking at examples of these in turn..

#### (Completed as a team)

#### User Model

1. Define the IUser interface with properties `username`, `email` and `password`
2. Create a `userSchema` using `mongoose.Schema` adhering to the IUser interface
3. Define fields with specific types and validations (e.g., use validator.isEmail for email validation).

![UserSchema Model](</README Assets/UserSchema.png>)

<ins>`router.ts`</ins>

Looking at one particular route `router.route("/api/animals/:animalId").get(getAnimalById)`

- the Express method `router.route()` creates a route handler
- `api/animals/:animalId`, the URL path pattern that specifies a specific endpoint. `:animalId`, the route parameter that represents a placeholder for the ID of the animal - meaning this route matches any URL that mirrors `api/animals/` followed by an `animalId`
- `.get(getAnimalById)`, the route handler for HTTP GET requests to `/api/animals/animalId`
- a GET request is made to `/api/animals/animalId`, Express matches the request to this route handler, extracts the value of `:animalId` from the URL and passes it as a parameter to the `getAnimalById` function, which handles the request and sends an appropriate response

There are multiple HTTP requests seen below that we used to retrieve, display, remove or update our data throughout our project including, POST, GET, DELETE, PUT

![Route Handling](</README Assets/Router.png>)

#### (Completed independently)

#### Middleware `secureRoute`

We implemented middleware called secureRoute to restrict certain features to signed-up users only. Each user gets a unique token upon logging in, ensuring only logged-in users with a valid token can perform actions like deleting animals.

By placing `secureRoute` before the `.delete` request in our router, as seen here `router.route("/api/animals/:animalId").delete(secureRoute, deleteAnimal)`, meant only authenticated users can delete animals.

<ins>How it works?</ins>

1. The secureRoute function runs upon user login.
2. It retrieves the token from request headers.

3. If no token exists or is not verified using a secret key (only known by the server), there is an error or no payload ie the information being transmitted (username, userID or any additional data needed for authorisation) then the response is an ‘unauthorised’ message.

4. If the token is valid, the user's ID is extracted. If the ID matches a user in the database, the user object is attached to the response locals, making user info easily accessible and avoiding repetitive database queries.
5. The next function is then carried out - in the example below the create animal is called.

![Create Animal Route](</README Assets/Creating animal.png>)

## Challenges

#### `updateAnimal Function`

The approach we took for writing the update animal function although it gave us initial building blocks may have led to a couple of challenges.

We used the add animal function as the foundation - although both followed the same animal model the HTTP requests are significantly different; PUT and POST respectively.

Changing the HTTP request from POST to PUT did in fact update the existing animal that has the animalId called in the PUT request (see below).

![Update animal - animalId](</README Assets/Update.png>)

However, instead of just updating the modified field it did not pre-populate the fields with the already defined values associated with that animalId but in fact rendered empty fields - to fix this we used a `useEffect` hook that used a `fetchAnimal` function
to fetch the existing data of that specific animal from the server.

After fetching the data, `setFormData(animalData)` is called, this updates the state with the fetched animal data.

![Update animal - setFormData](</README Assets/Update FormData.png>)

And because the `formData` state is bound to the input fields with the `value` attribute any fields not modified by the user remains the same - the code discussed here can be seen below.

![Update animal - animalId](</README Assets/Update Animal Function.png>)

## Wins

#### Home Page Hide and Show

Although not overly complicated code I felt a big win for me during this project was consolidating my learning so far. Authentication within the project meant we had both users and non-users, allowing us to add conditionals (see below for an example).
This checks if the user variable is falsy, if it is, it renders the Link component with the text `Login` and a link to the `/login` route.

![Conditional Nav](</README Assets/Conditional Nav.png>)

Using this same logic we personalised the homepage by adding a conditional that changed the text on the homepage depending on whether the user variable is falsy.

The yellow circle highlights the code that only renders if there is a user object available (i.e., the user is authenticated), and will display a welcome greeting `Hello {user?.username},` that is personalised to them.

The red circle highlights the code that renders only when a user object is not found and displays a welcoming message inviting the user to join the community and to sign up.

![Homepage hide and show name conditional](</README Assets/Homepage code.png>)

## Key Learnings and Takeaways

#### Git

My last project followed a more driver, navigator dynamic however, with specific tasks assigned to specific members of the team this project required the use of Git far more.
With minimal experience and confidence in using Git this was a big learning curve for me. Learning from a fellow team member, lots of practice and learning from my mistakes, I now feel more confident with creating branches, merge conflict management and pulling, merging and pushing code from my local branch to the main repository.
My last project can be seen [here](https://seb-78project2.netlify.app/).

#### Team Dynamic

I believe the success or failure of a project hinges on the team's dynamics, which serve as its core defining factor. With this in mind it became clear that regular check ins and regrouping throughout the day was essential. This meant the whole team stayed on track and could hold ourselves accountable for what we were required to complete.

## Bugs

#### `updateAnimal Function`

After changing the HTTP request to `PUT` as well as other additional code changes within the front end we began testing the updateAnimal function and even though the console.log tests we carried out returned accurate data associated with the animalId being retrieved the result was still throwing up errors.

Further console.logs in the backend brought to light the code `req.body.animalId` in the animalController `updateAnimal` function - changing this to `req.params.animalId` meant that the `animalId` is extracted from the URL path parameter (as defined in the route declaration - see below) not the request body allowing the backend to identify the specific animal being updated. This fixed the errors and successfully updated the desired animal.

<div style="overflow: auto;">
    <img src="README Assets/req.params.png" alt="updateAnimal Function" style="float:left; margin-right:10px;" width="450"/>
    <img src="README Assets/Update route.png" alt="Route for updateAnimal Function" style="float:left; margin-right:10px;" width="450"/>
</div>

## Future Improvements

#### Confirm Delete Modal

I believe it is good practice for when deleting something within a database there should be a confirmation of deletion to ensure that the user actually does want to delete said element.

This was not part of our MVP but a nice to have feature however, it became more feasible as we went. We did start building this feature but unfortunately had to comment out the code implemented prior to deployment due to unforseen last minute edits required to meet our MVP.

Adding this feature in the future would be ideal.

#### Like Button

An additional feature we added was the like button that allowed users to 'like' an animal. Using the code below we were able to add a basic counter function that increased the number displayed by 1 when the button was clicked.

![Like button function](</README Assets/Like.png>)

With this function the displayed number will return to 0 every time the page is refreshed, ideally we would have liked to link the number of likes to the database specific to that animal so the likes get recorded.

This would then mean we could add other features such as sort by popularity, unfortunately we ran out of time but in the future this would have been a great feature to have.
