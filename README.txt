[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/e__G6ZpK)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15952124)
Starter Code for Reaction Timer 
Run npm install to install all dependencies 
The above uses package.json to build the project
Note .gitignore is set to ignore node_modules

Description of code:

My reaction timer is initiated when the start button is clicked. 
At that point, the start button is disabled and the stop button is enabled.
The user must wait for the stop button to turn red to click,
otherwise this is considered "cheating" and the game restarts after 3s.
Once the user properly stops the game, the reaction time is logged as
the amount of time between the color change and the "stop" click, which
is displayed to the user who can choose to submit it or to play
again to get a better time. 

There are also some protections to prevent someone from submitting their
name before they have a reaction time, or from submitting the same reaction
time twice through the creation a "submit" variable that control when 
a submission can be made (only after a full round of start/stop)

