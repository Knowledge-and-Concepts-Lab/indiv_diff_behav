var jsPsychGridSelect = (function (jspsych) {
    'use strict';
    
    const info = {
        name: "grid-select",
        parameters: {
          imageList:{
            type: jspsych.ParameterType.STRING,
            pretty_name: "filenames",
            default: undefined,
            array: true,
          },
          propertyList:{
            type: jspsych.ParameterType.STRING, //e.g. young_black_woman
            pretty_name: "dimensions",
            default: undefined,
            array: true,
          }
            
       
            
        },
    };
    
    class GridSelectPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial) {
            var plugin_id_name = "jspsych-grid-select";
            var html = "";
            // inject CSS for trial
            html += '<style id="jspsych-grid-select-css">';
            html +=
            ".image-grid {display: grid;grid-template-columns: repeat(4, 1fr);gap: 20px; margin-bottom: 20px;margin-top:20px; width:900px;}" +
            ".image-cell img {width: 100%;height: auto;cursor: pointer;} .disabled { opacity: 0.5;}";
            html += "</style>";
            
            html+=`<div id = "instructions" style = "text-align: center; font-weight:bold;width:900px;">Please use the cursor to click and select the 2 images most similar to the images you saw during the last sequence. </div>`+
            `<div id="custom-plugin-container">`+
            `<div class="image-grid">`+
            `<div class="image-cell"><img src=${trial.imageList[0]} properties=${trial.propertyList[0]}></div>`+
            `<div class="image-cell"><img src=${trial.imageList[1]} properties=${trial.propertyList[1]}></div>`+
            `<div class="image-cell"><img src=${trial.imageList[2]} properties=${trial.propertyList[2]}></div>`+
            `<div class="image-cell"><img src=${trial.imageList[3]} properties=${trial.propertyList[3]}></div>`+
            `<div class="image-cell"><img src=${trial.imageList[4]} properties=${trial.propertyList[4]}></div>`+
            `<div class="image-cell"><img src=${trial.imageList[5]} properties=${trial.propertyList[5]}></div>`+
            `<div class="image-cell"><img src=${trial.imageList[6]} properties=${trial.propertyList[6]}></div>`+
            `<div class="image-cell"><img src=${trial.imageList[7]} properties=${trial.propertyList[7]}></div>`+
            `</div><button id="submit-button" class = "jspsych-btn">Submit</button></div>`;
            
            
            
            
            // render
            display_element.innerHTML = html;



    var selectedProperties = [];
    window.oncontextmenu = function (event) {
      event.preventDefault();
      return false; // Prevents right-click menu from appearing
    }
    // Function to handle image click
    function imageClickHandler(event) {
      var clickedImage = event.target;
      var property = clickedImage.getAttribute("properties");

      if (!selectedProperties.includes(property)) {
        if (selectedProperties.length < 2) {
          selectedProperties.push(property);
          clickedImage.style.border = "8px solid #00ff00"; // Highlight selected image
        }
      } else {
        selectedProperties = selectedProperties.filter(item => item !== property);
        clickedImage.style.border = "none"; // Remove highlight
      }
    }
    const end_trial = () => {
      console.log(selectedProperties)
      this.jsPsych.pluginAPI.clearAllTimeouts();
      // save data
      var trialdata = {
          // rt: response.rt,
          // stimulus: trial.stimulus,
          // slider_start: trial.slider_start,
          response: selectedProperties,
      };
      display_element.innerHTML = "";
      // next trial
      this.jsPsych.finishTrial(trialdata);
  };

    // Attach click event handlers to images
    var images = display_element
    .querySelectorAll(".image-cell img");
    images.forEach(function(image) {
      image.addEventListener("contextmenu", imageClickHandler);
      image.addEventListener("contextmenu", ()=>{
        if (selectedProperties.length === 2) {
          submitButton.disabled = false;
          submitButton.classList.remove('disabled');
        } else {
          submitButton.disabled = true;
          submitButton.classList.add('disabled');
        }
      })

      image.addEventListener("click", imageClickHandler);
      image.addEventListener("click", ()=>{
        if (selectedProperties.length === 2) {
          submitButton.disabled = false;
          submitButton.classList.remove('disabled');
        } else {
          submitButton.disabled = true;
          submitButton.classList.add('disabled');
        }
      })

      


      // add a hover effect that reduces opacity of the image by 50% while the mouse is over it.
      image.addEventListener("mouseover", function(event) {
        event.target.style.opacity = "0.5";
      }
      );
      image.addEventListener("mouseout", function(event) {
        event.target.style.opacity = "1";
      }
      )

    });

  // Get the submit button element
var submitButton = document.getElementById('submit-button');
submitButton.disabled = true;

// Add an event listener to the submit button
submitButton.addEventListener('click', function() {
  // Check the length of the selectedProperties array
  if (selectedProperties.length === 2) {
    // Record selected image filenames
    // jsPsych.finishTrial({ selectedImages: selectedImages });
    end_trial();
  }
});




    // // Handle submit button click
    // document.getElementById("submit-button").addEventListener("click", function() {
    //   // Record selected image filenames
    //   // jsPsych.finishTrial({ selectedImages: selectedImages });
    //   end_trial();

     
    // });

    console.log(selectedProperties);
    
                
            }
            
        }
        GridSelectPlugin.info = info;
        
        return GridSelectPlugin;
        
    })(jsPsychModule);
    