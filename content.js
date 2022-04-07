var previewed = false
var submit_assignment_button = document.getElementById('submit_file_button')
var preview_button = document.createElement('button')
var submission_box = document.getElementsByClassName("formtable")[0].firstChild.nextSibling
preview_button.innerText = "Preview and Submit"
preview_button.setAttribute("class", "btn btn-primary")
function testPreview(){
    if(!previewed){
        submit_assignment_button.style.display = "none"
        var button_container = submit_assignment_button.parentElement
        
        button_container.appendChild(preview_button)
        preview_button.addEventListener('click', function(e){
            e.preventDefault()
            var myDialog = document.createElement("dialog");
            var button_container = document.createElement("div")
            var verified_button = document.createElement("button")
            var cancel_button = document.createElement("button")
            
            verified_button.setAttribute("class", "btn btn-primary")
            verified_button.setAttribute("id", "submit_file_button")
            cancel_button.setAttribute("class", "cancel_button btn")
            verified_button.setAttribute("id", "submit_file_button")
            cancel_button.setAttribute("type", "button")
            verified_button.innerText = "Looks Good!"
            cancel_button.innerText = "Cancel"
            button_container.appendChild(cancel_button)
            button_container.appendChild(verified_button)
            
            cancel_button.addEventListener('click', function(){
                myDialog.close()
            })
            verified_button.addEventListener('click', function(e){
                myDialog.close()
                previewed = true
                testPreview()
            })
            document.body.appendChild(myDialog)
            var uploaded_file= document.getElementsByClassName("input-file")[0].files[0]
            var title = document.createElement("h1")
            title.setAttribute("class", "title")
            title.innerHTML = "\nAssignment Preview for " + uploaded_file.name
            myDialog.appendChild(title)
            myDialog.showModal();
            var blobUrl = URL.createObjectURL(uploaded_file)
            var link = document.createElement("a"); // Or maybe get it from the current document
            link.href = blobUrl;
            link.download = "test.pdf";
            link.innerHTML = "<br/>Click here to download the file";
            var pdf = document.createElement("embed")
            pdf.setAttribute("src", blobUrl)
            pdf.setAttribute("type", "application/pdf")
            pdf.setAttribute("width", "970")
            pdf.setAttribute("height", "800")
            myDialog.appendChild(pdf)
            myDialog.appendChild(link);
            myDialog.appendChild(button_container)
            
            });
    } else {
        submit_assignment_button.style.display = "unset"
        preview_button.style.display = "none"
        preview_complete_row = document.createElement("tr")
        preview_complete_column = document.createElement("td")
        preview_complete_column.setAttribute("colspan", "2")
        preview_complete_column.innerHTML = "File was Previewed Before Submission &#10003;"
        preview_complete_row.appendChild(preview_complete_column)
        submission_box.appendChild(preview_complete_row)
    }
}

testPreview()


