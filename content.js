function preview() {
  // Get current submit button elements
  var submit_assignment_button = document.getElementById("submit_file_button");
  var submission_box =
    document.getElementsByClassName("formtable")[0].firstChild.nextSibling;

  // Create new "Preview and Submit button to replace the original"
  var preview_button = document.createElement("button");
  preview_button.innerText = "Preview and Submit";
  preview_button.setAttribute("class", "btn btn-primary");
  submit_assignment_button.style.display = "none";

  // Put button in a container
  var button_container = submit_assignment_button.parentElement;
  button_container.appendChild(preview_button);

  // Set click listener to show dialog with preview of file
  preview_button.addEventListener("click", function (e) {
    // Set up HTML elements in preview dialog
    e.preventDefault();
    var preview_dialog = document.createElement("dialog");
    var button_container = document.createElement("div");
    var verified_button = document.createElement("button");
    var cancel_button = document.createElement("button");
    button_container.setAttribute("id", "preview-dialog-button-container");
    verified_button.setAttribute("class", "btn btn-primary");
    verified_button.setAttribute("id", "submit_file_button");
    cancel_button.setAttribute("class", "cancel_button btn");
    verified_button.setAttribute("id", "submit_file_button");
    cancel_button.setAttribute("type", "button");
    verified_button.innerText = "Looks Good!";
    cancel_button.innerText = "Cancel";
    button_container.appendChild(cancel_button);
    button_container.appendChild(verified_button);

    uploaded_file = document.getElementsByClassName("input-file")[0].files[0]; // Retrieve uploaded file data

    // Set up title for dialog with file name
    var dialog_title = document.createElement("h1");
    dialog_title.setAttribute("class", "title");
    dialog_title.innerHTML = "\nAssignment Preview for " + uploaded_file.name;
    preview_dialog.appendChild(dialog_title);
    document.body.appendChild(preview_dialog); // add dialog to document

    preview_dialog.showModal(); // Create pop up for the dialog

    // Set up File URL to embed file data
    var blobUrl = URL.createObjectURL(uploaded_file);
    var download_link = document.createElement("a"); // Create download link in case user would like to download the file
    download_link.setAttribute("id", "download-file-link");
    download_link.href = blobUrl;
    download_link.download = uploaded_file.name;
    download_link.innerHTML = "<br/>Click here to download the file";

    // Set up previews for different file types
    switch (uploaded_file.type) {
      case "application/pdf": // PDF File
        file = document.createElement("embed");
        file.setAttribute("id", "uploaded-file-content");
        file.setAttribute("src", blobUrl);
        file.setAttribute("type", "application/pdf");
        file.setAttribute("width", "970");
        file.setAttribute("height", "800");
        preview_dialog.appendChild(file);
        break;

      case uploaded_file.type == "audio/wav": // Audio File
        var file = document.createElement("embed");
        file.setAttribute("id", "uploaded-file-content");
        file.setAttribute("src", blobUrl);
        file.setAttribute("type", "audio/wav");
        preview_dialog.appendChild(file);
        break;
      case uploaded_file.type.includes("image/"): // Image file
        var file = document.createElement("img");
        file.setAttribute("id", "uploaded-file-content");
        file.setAttribute("width", "970");
        file.setAttribute("height", "800");
        file.setAttribute("src", blobUrl);
        preview_dialog.appendChild(file);
        break;

      default: // Unsupported, but downloadable
        var unsupported = document.createElement("div");
        unsupported.setAttribute("class", "error_message");
        unsupported.innerHTML =
          "This is an unsupported document type for preview. Please download it and verify it manually.";
        preview_dialog.appendChild(unsupported);
        break;
    }

    // Add event listeners for cancel and verified buttons
    cancel_button.addEventListener("click", function () {
      preview_dialog.close();
    });
    verified_button.addEventListener("click", function (e) {
      preview_dialog.close();
      submit_assignment_button.style.display = "unset";
      preview_button.style.display = "none";
      preview_complete_row = document.createElement("tr");
      preview_complete_column = document.createElement("td");
      preview_complete_column.setAttribute("colspan", "2");
      preview_complete_column.innerHTML =
        "File was Previewed Before Submission &#10003;";
      preview_complete_row.appendChild(preview_complete_column);
      submission_box.appendChild(preview_complete_row);
    });
    button_container.appendChild(download_link);
    preview_dialog.appendChild(button_container);
  });
}

preview(); // call 
