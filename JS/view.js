const urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('project');
const title = document.getElementById('projtitle')
const exp = document.getElementById('projtitleexp')
const para1 = document.getElementById('para1')
const para2 = document.getElementById('para2')
let skilldiv = document.getElementById('skillsprojectdiv')
const img = document.getElementById('projectimage')
const trybtn = document.getElementById('trybtn')
const codebtn = document.getElementById('codebtn')
if (name === 'gc'){
    trybtn.style.display = "none"
    title.innerText = "GreenCampus Management System"
    exp.innerText = "A management system designed for schools in order to help them reduce their carbon footprint and energy usage, with the final goal of becoming net zero emissions."
    para1.innerText = "This was a project for the Full Stack Development Project module, where we were given a problem statement by Alibaba stakeholders on helping educational institutes achieve net zero emissions by 2050. We came up with GreenCampus for this purpose. Paired with charts and AI insights, GreenCampus helps principals track their school's eco-friendliness and gives them tools to encourage students to be more eco-friendly, like campaigns, rewards and games."
    para2.innerText = "Contributions: Dashboard elements and charts, goal setting functionality, campaigns, rewards and events."
    img.setAttribute("src", "assets/GreenCampus.png")
    let skillslist = ["HTML", "CSS", "JavaScript", "Git", "Github", "SQL", "Bootstrap", "NodeJS"]
    skilldiv = addSkills(skillslist, skilldiv)
    
    codebtn.setAttribute("href", "https://github.com/jungsek/GreenCampus")
}
if (name === 'hs'){
    codebtn.style.display = "none"
    title.innerText = "Highway Surfers"
    exp.innerText = "An endless runner game made in Unity where you, the driver, have to keep dodging trash bins randomly scattered across the road."
    para1.innerText = "This was a project I did for my Early Admission Exercise (EAE) for polytechnic schools. This was my introduction into game development, and I realised that game development was not just the simple drag-and-drop system that I made it out to be, and was a lot more complex than that, requiring countless lines of code just to accurately spawn objects in the correct places. Overall, this project was challenging, but I enjoyed the process and had a newfound respect for game developers."
    para2.innerText = "Models and all assets were sourced from free online sources."
    img.setAttribute("src", "assets/highwaysurfers.jpeg")
    let skillslist = ["unity", "csharp"]
    skilldiv = addSkills(skillslist, skilldiv)
    
    trybtn.setAttribute("href", "https://simmer.io/@branzin/highway-surfers-v2")
}
if (name === 'cio'){
    title.innerText = "Cosmo.IO Trivia Game"
    exp.innerText = "A trivia game with different categories, where you must save Cosmo the robot by answering trivia questions correctly."
    para1.innerText = "This project was made with a trivia API, three.js and RestDB (a free online NoSQL database). my introduction into the world of 3D web development using THREE.js, and it was extremely fun to make. My group and I decided to have a backstory behind our game, where Cosmo the robot did not have enough fuel to get back to Earth, and we had to save him by answering trivia questions correctly, as his rocket was fueled by knowledge."
    para2.innerText = "Contributions: Implemented all 3D elements and front-end for the home, navigation, and story pages."
    img.setAttribute("src", "assets/threejs website.png")
    let skillslist = ["HTML", "CSS", "JavaScript", "Git", "Bootstrap"]
    skilldiv = addSkills(skillslist, skilldiv)
    trybtn.setAttribute("href", "https://brazeen.github.io/FED_CosmoIO_website/")
    codebtn.setAttribute("href", "https://github.com/brazeen/FED_CosmoIO_website")
}
if (name === 'v'){
    trybtn.style.display = "none"
    title.innerText = "Volunteezy Volunteering Platform"
    exp.innerText = "A volunteering platform connecting volunteers with NGOs who host volunteering opportunities."
    para1.innerText = "This project was my first full-stack project, using Microsoft SQL Server to locally host the server. It also taught me about the importance of website security like using JWTs and encryption to store data in the SQL tables, and how to use the MVC framework to separate the front-end and back-end of the website. Overall, it was a great idea that I felt was something I was passionate on creating due to its potential to help the community."
    para2.innerText = "Contributions: volunteers’ opportunity application , NGO account application, all admin functions and database design."
    img.setAttribute("src", "assets/Untitled.jpeg")
    let skillslist = ["HTML", "CSS", "JavaScript", "Git", "Github", "SQL", "Bootstrap", "NodeJS"]
    skilldiv = addSkills(skillslist, skilldiv)
    
    codebtn.setAttribute("href", "https://github.com/brazeen/BED2024Apr_Volunteezy")
}
if (name === 'ph'){
    trybtn.style.display = "none"
    title.innerText = "PlanHub Travel Companion"
    exp.innerText = "A mobile Android app to help users plan their trips by providing travel recommendations and itinerary suggestions, with community-based features, allowing users to share ideas."
    para1.innerText = "This project was my first Android development project, and my first project in Java. It was challenging to learn a new language and a new device's elements and functions, but it was a great learning experience. I also learned about the importance of UI/UX design and how to make a user-friendly app."
    para2.innerText = "Contributions: editing profile, messaging users, searching users, follow/unfollow users."
    img.setAttribute("src", "assets/planhubscreens.png")
    let skillslist = ["androidstudio", "java", "firebase", "Git", "Github", "SQL"]
    skilldiv = addSkills(skillslist, skilldiv)
    
    codebtn.setAttribute("href", "https://github.com/RISHIKEsH12321/MAD24_P01_Team3")
}
if (name === 'nc'){
    title.innerText = "Ngee Ann City Game"
    exp.innerText = "A 2D city building simulation, complete with saving/loading games, a leaderboard, drag-and-drop build functionality and point systems."
    para1.innerText = " This project was a simple project made for the team to learn the Scrum framework and how it would be used in real projects. Scrum allowed us as a team to keep track of our tasks very easily, and encouraged us to ideate on what else we could add / what else the stakeholders wanted (by encouraging us to do regular Sprint Reviews with them to get feedback)."
    para2.innerText = "Contributions: Implemented leaderboard, drag-and drop functionality, home page layout."
    img.setAttribute("src", "assets/ngeeanncity.png")
    let skillslist = ["HTML", "CSS", "JavaScript", "Git", "Github"]
    skilldiv = addSkills(skillslist, skilldiv)
    trybtn.href = "https://brazeen.github.io/NgeeAnnCityGame/"
    codebtn.href = "https://github.com/brazeen/NgeeAnnCityGame"

}











function addSkills(list, div) {
    list.forEach(skill => {
        const skillitem = document.createElement("li");
        skillitem.className = "contacticon";
        const img = document.createElement("img");
        img.src = `assets/${skill.toLowerCase()}.png`;
        img.alt = skill;
        img.height = "50";
        skillitem.appendChild(img);
        div.appendChild(skillitem);
    });
}
