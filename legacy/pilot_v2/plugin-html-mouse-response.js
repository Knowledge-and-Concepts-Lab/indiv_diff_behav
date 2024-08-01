var jsPsychHtmlMouseResponse = (function (jspsych) {
    'use strict';
    
    const info = {
        name: "html-mouse-response",
        parameters: {
            /**
            * The HTML string to be displayed.
            */
            stimulus: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Stimulus",
                default: undefined,
            },
            /**
            * Array containing the key(s) the subject is allowed to press to respond to the stimulus.
            */
            choices: {
                type: jspsych.ParameterType.KEYS,
                pretty_name: "Choices",
                default: "ALL_KEYS",
            },
            /**
            * Any content here will be displayed below the stimulus.
            */
            prompt: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Prompt",
                default: null,
            },
            /**
            * How long to show the stimulus.
            */
            stimulus_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Stimulus duration",
                default: null,
            },
            /**
            * How long to show trial before it ends.
            */
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
            /**
            * If true, trial will end when subject makes a response.
            */
            response_ends_trial: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response ends trial",
                default: true,
            },
        },
    };
    
    class HtmlMouseResponsePlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial) {
            var new_html = '<div id="jspsych-html-keyboard-response-stimulus">' + trial.stimulus + "</div>";
            // add prompt
            if (trial.prompt !== null) {
                new_html += trial.prompt;
            }
            // draw
            display_element.innerHTML = new_html;
            // store response
            var clickResponse;

            var click_listener= function(e) {
                if (e.button === 0) {
        
                  clickResponse = 'greater';
                  if (response.key == null) {  
                    response.key = clickResponse;
                }
                  console.log('clicklistener', clickResponse)
                } 
                else if (e.button === 2) {
       
                  clickResponse = 'lesser';
                  if (response.key == null) {  
                    response.key = clickResponse;
                }
                console.log('clicklistener', clickResponse)
            }
            document.removeEventListener('contextmenu', click_listener);
            document.removeEventListener('click', click_listener);
           
               
               
              };
        


              var response = {
                  key: null,
              };
            // var response =[];

            // function to end trial when it is time
            const end_trial = () => {
                // kill any remaining setTimeout handlers
                this.jsPsych.pluginAPI.clearAllTimeouts();
                document.removeEventListener('click', click_listener);
                document.removeEventListener('contexmenu', click_listener);

                // kill keyboard listeners
                //   if (typeof keyboardListener !== "undefined") {
                //       this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
                //   }
                // gather the data to store for the trial
                var trial_data = {
                    //   rt: response.rt,
                    stimulus: trial.stimulus,
                    response: response,
                };
                // clear the display
                display_element.innerHTML = "";
                // move on to the next trial
                this.jsPsych.finishTrial(trial_data);
            };
            // function to handle responses by the subject
            // var after_response = (info) => {
            //     // after a valid response, the stimulus will have the CSS class 'responded'
            //     // which can be used to provide visual feedback that a response was recorded
            //     display_element.querySelector("#jspsych-html-keyboard-response-stimulus").className +=
            //     " responded";
            //     // only record the first response
            //     if (response.key == null) {
            //         response.key = info;
            //     }
            //     if (trial.response_ends_trial) {
            //         end_trial();
            //     }
            // };
            // start the response listener
            //   if (trial.choices != "NO_KEYS") {
            //       var keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
            //           callback_function: after_response,
            //           valid_responses: trial.choices,
            //           rt_method: "performance",
            //           persist: false,
            //           allow_held_key: false,
            //       });
            //   }
            // hide stimulus if stimulus_duration is set
            if (trial.stimulus_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    display_element.querySelector("#jspsych-html-keyboard-response-stimulus").style.visibility = "hidden";
                }, trial.stimulus_duration);
            }
            // end trial if trial_duration is set
            if (trial.trial_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
            }
            

      
                // Define a function to handle the click event
                function handleClick(event) {
                  if (response.key == null) {  
                  if (event.type=='click'){
                    // response.push('greater');
                    var this_response = 'greater'
                    response.key = this_response;
                   
                    console.log(response);
                  }
                  else if (event.type=='contextmenu'){
                    // response.push('lesser');
                    var this_response = 'lesser'
                    response.key = this_response
                    console.log(response);
                  }
                  // Remove the click event listener from the element
                    // document.removeEventListener('click', handleClick);
                    // document.removeEventListener('contextmenu', handleClick);

                //   end_trial();
                }
            }
              
            window.oncontextmenu = function (event) {
                
                event.preventDefault();
                return false; // Prevents right-click menu from appearing
            }
            
            
            // document.
            // addEventListener('click', handleClick);
            
            // document.
            // addEventListener('contextmenu', handleClick);
                

            document.addEventListener('click', click_listener);
            document.addEventListener('contextmenu', click_listener);
                
                
                
                
                
                
            }
            simulate(trial, simulation_mode, simulation_options, load_callback) {
                if (simulation_mode == "data-only") {
                    load_callback();
                    this.simulate_data_only(trial, simulation_options);
                }
                if (simulation_mode == "visual") {
                    this.simulate_visual(trial, simulation_options, load_callback);
                }
            }
            create_simulation_data(trial, simulation_options) {
                const default_data = {
                    stimulus: trial.stimulus,
                    rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
                    response: this.jsPsych.pluginAPI.getValidKey(trial.choices),
                };
                const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
                this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
                return data;
            }
            simulate_data_only(trial, simulation_options) {
                const data = this.create_simulation_data(trial, simulation_options);
                this.jsPsych.finishTrial(data);
            }
            simulate_visual(trial, simulation_options, load_callback) {
                const data = this.create_simulation_data(trial, simulation_options);
                const display_element = this.jsPsych.getDisplayElement();
                this.trial(display_element, trial);
                load_callback();
                if (data.rt !== null) {
                    this.jsPsych.pluginAPI.pressKey(data.response, data.rt);
                }
            }
        }
        HtmlMouseResponsePlugin.info = info;
        
        return HtmlMouseResponsePlugin;
        
    })(jsPsychModule);
    