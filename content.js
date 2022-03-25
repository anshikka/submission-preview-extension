var courses_button_text = document.getElementById('global_nav_courses_link').getElementsByTagName("div")[1]
courses_button_text.innerHTML = "Classes"

var submit_assignment_button = document.getElementById('submit_file_button')
submit_assignment_button.addEventListener('click', function(){
    var myDialog = document.createElement("dialog");
    document.body.appendChild(myDialog)
    var text = document.createTextNode("This is a dialog window");
    myDialog.appendChild(text);
    myDialog.showModal();
})