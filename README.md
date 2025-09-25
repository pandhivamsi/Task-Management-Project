# Task-Management-Project

Steps to run the app locally:- <br>
 1.clone the repository git clone https://github.com/pandhivamsi/Task-Management-Project.git <br>
 2.npm install <br>
 3.npm run dev <br>
 4.npm start
<br>
UseCase Diagram:-
<br>
![alt text](<WhatsApp Image 2025-09-24 at 11.37.46_2bb870f1.jpg>)
<br>
Models:-<br>
![alt text](<WhatsApp Image 2025-09-24 at 16.24.38_718d3aa0.jpg>)
<br>
<br>
 1.User Model <br>
     -id: id number <br>
     -name: name of the user <br>
     -title : title of the user <br>
     -organization: name of the organization <br>
     -workPhone: phone number <br>
     -mobilePhone: mobile number <br>
     -email: user email<br>
     -photo: user photo <br>
 <br>
 2.Card Model <br>
      -id:id number<br>
      -title: title of the card<br>
      -size :size of the card<br>
      -priority :pripority of the card<br>
      -dueDate:due date<br>
      -release:release<br>
      -sprint :sprint<br>
      -status:status of the card<br>
<br>
3.Peoples Model<br>
      -firstName: first name of User <br>
      -lastName": last name of user<br>
      -loginId": login id<br>
      -email: email<br>
      -primaryRole: role<br>
      -status: present status<br>
      -id: id number<br>
<br>
4.projects Model <br>
       id: Proejct id <br>
       projectName: Project Name <br>
<br>
APIs
 ---
Auth Endpoints <br><br>

Signup User(POST)<br><br>

  -/api/v1/auth/signup<br>
  -User can signup by adding firstName lastName, user Role and password,confoirm password.<br><br>

Signin User(POST)<br><br>

 -/api/v1/auth/signup<br>
 -User can signin with userNmae and password.<br><br>

User Endpoints<br><br>

User Details(GET)<br><br>

 -/api/v1/users/getDetails/:userId (where userId is the path variable)<br>
 -To fetch the details of the user.<br><br>

Login Page:-<br>
<br>
![alt text](<log n.jpg>)<br>
	This is a user login form.its lets users sign in to an app or website using their username and password.  <br>
  ->How It Works <br>
	  -At the top, "User Login" tells users what to do.<br>
  ->There are two input boxes:<br>
	  -The first one is for entering a username.<br>
	  -The second one is for entering a password.<br>
  ->There are two buttons:<br>
	 -The "Login" button is for users to sign in if they already have an account.<br>
	 -The "New? Register" button is for new users who want to create an account.<br> 
<br>
<br>
Registration Page:-<br>
![alt text](reg.jpg) <br>
	-This is a registration form for creating a new account in an app or website.<br>
  ->What Each Field Means:- <br>
	  -The title "Register" lets users know they are signing up.<br>
	  -Username: Type a username for the new account.<br>
	  -Role: Enter a role, like "ROLE_USER," which decides user access level.<br>
	  -Password: Type a password for security.<br>
	  -Confirm Password: Type the same password again to make sure there are no  mistakes.<br>
  ->Buttons:-<br>
	  -"Register" submits the form to create an account.<br>
	  -"Have account? Sign in" lets users go back to the login page if they already have an account.<br>
    This helps new users sign up safely and easily for the service.<br>
    <br>
Header :-<br>
  1.Select Project:-<br>
    ![alt text](<Screenshot 2025-09-25 193458.png>)<br>
   -When you click the Select Project button, a dropdown appears with an option to Add Project.<br>
   -Clicking on it opens a form where you can enter the Project Name.<br>
   -Finally, you can save it by clicking the Save Project button.<br>
  2.Profile icon:-<br>
   ![alt text](<Screenshot 2025-09-25 185506.png>)<br>
   -When you click the profile icon, a dropdown menu opens.<br>
   -It shows options like Edit Details, Reset Password, choose a theme color (using the color dots), and Log Out.<br>
   -This menu is simply for quickly accessing profile-related actions.<br> 
  3.ThreeDots icon:-<br>
    ![alt text](<Screenshot 2025-09-25 190038.png>)<br>
   -When you click the three dots icon, a menu panel opens.<br>
   -It shows options like Peoples and Projects.<br>
   -This lets you quickly switch between managing people and managing projects.<br>
     ->Peoples :-<br>
      ![alt text](ppl1.jpg)<br>
       -When you click the Peoples button, a popup form appears.<br>
       -Here you can enter details like First Name, Last Name, Login ID, Email, Role, and Status.<br>
       -Finally, you can add the member or cancel the action.<br>
     ->Projects :-<br>
      ![alt text](prt.jpg)<br>
      -When you click the Projects button, a popup form appears.<br>
      -It allows you to enter the Project Name, while fields like Project Id and Created By are shown automatically.<br>
      -You can then choose to add the project or cancel the action.<br>
  4.Search icon:-<br>
   ![alt text](<Screenshot 2025-09-25 192601.png>)<br>
   -When you click the search icon, a text box appears.<br>
   -Here you can type keywords to search for items quickly.<br>
  5.Support icon:-<br>
    ![alt text](<Screenshot 2025-09-25 192921.png>)<br>
    -When you click the Support icon, a scheduling window opens.<br>
    -It shows an option to book a 30-minute meeting.<br>
    -You can select a date and time from the calendar.<br>
    -After confirmation, the web conferencing details will be shared.<br>
    -This helps you easily schedule a support call online.<br>
<br>
Select Cards:-<br>
 ![alt text](sltcards.jpg)<br>
 All cards :-<br>
	-Everyone’s tasks<br>
 My cards :-<br>
	-Only my tasks <br>


Dashboard:- <br>
![alt text](db.jpg) <br>
Dashboard page:<br><br>
  -Top Bar – Options like Select cards, Create Task, Standup_Wizard, and  Filters  are available.<br>
  -Task Board – It is divided into three columns: Ready, In Progress, and Done.<br>
  -Cards – Each card shows a small profile icon, description text, and task details.<br>
  -Card Actions – Icons at the bottom of each card allow you to comment, edit, flag, favorite, or delete tasks.<br>
  -Color Sections – Columns have different background colors (blue for Ready, yellow for In Progress, green for Done).<br>
  -Multiple Tasks – You can track several tasks under each status column.<br>
  -Purpose – The dashboard helps manage tasks visually like a Kanban board.<br>
<br>
Create Task:-<br>
  1. Card Details Tab:-<br>
  ![alt text](carddtls.jpg)<br>
	-This is where you enter all the task information.<br>
    ->Fields include:-<br>
	-Title & Description → Name and details of the task.<br>
	-Priority & Status → Select task urgency and current progress stage.<br>
	-Due Date & Estimate (Days) → Set deadline and time estimation.<br>
	-Project List & People List → Assign task to a project and person.<br>
	-Size & Release → Additional classification of the task.<br>
      Basically, this tab is used to create or edit the task details.<br>
<br>
2. Comments Tab:-<br>
   ![alt text](cmntd.jpg)<br>
    -This tab is for communication and collaboration.<br>
   ->You (or team members) can:<br>
      -Add comments about the task.<br>
      -Mention people (using @).<br>
      -Attach files/images.<br>
      -Use emojis for quick reactions.<br>
     A list of all saved comments appears below for tracking discussions.<br>
     <br>
3.Standup_Wizard<br>
![alt text](swd.jpg)<br>
    - When you click the Standup_Wizard, the dashboard expands into full screen.<br>
    - In the Standup_Wizard, the "Start" button at the top left is a timer. It turns on when we click on the user profile.<br>
    - It displays three columns: Ready, In Progress, and Done.<br>
    - Each column contains task cards with user icons and details.<br>
    - The cards include options like comment, edit, flag, favorite, and delete.<br>
    - This view helps track tasks easily in a clean, organized layout.<br>
<br>
4.Fiter<br>
  ![alt text](filter.png)<br>
  <img src="filter.png" alt="My Image" height="100" width="200"><br>
  <img src="filter.png" alt="My Image" height="60" width="100"><br>
   -In the filter<br>
  ![alt text](filt.jpg)<br>
    - This is a filter panel to refine or organize the displayed data.<br>
    - Clear Filters lets you remove all applied filters.<br>
    - Categories available are Department, Role, and Priority.<br>
    - Selecting a category will show related filter options on the right side.<br>
    - Cancel closes the panel without saving any changes.<br>
    - Save applies the chosen filters to the main page.<br>
    - It helps quickly locate specific items by limiting the view to selected criteria.<br>








     




