function beginExperiment(stimStruct) {
    var jsPsych = initJsPsych();
    var stimStruct = stimStruct;

    stimCats = Object.keys(stimStruct);
    block1_stims =[];
    block2_stims =[];
    block3_stims =[];
    block4_stims =[];
    all_stims = [];
    for (var i = 0; i < stimCats.length; i++) {
        dim1 = Object.keys(stimStruct[stimCats[i]]);
        dim1_keys = Object.keys(stimStruct[stimCats[i]][dim1]);
        for (var j = 0; j < dim1_keys.length; j++) {
            dim2 = Object.keys(stimStruct[stimCats[i]][dim1][dim1_keys[j]]);
            dim2_keys = Object.keys(stimStruct[stimCats[i]][dim1][dim1_keys[j]][dim2]);
    
            for (var k = 0; k < dim2_keys.length; k++) {
                dim3 = Object.keys(stimStruct[stimCats[i]][dim1][dim1_keys[j]][dim2][dim2_keys[k]]);
                dim3_keys = Object.keys(stimStruct[stimCats[i]][dim1][dim1_keys[j]][dim2][dim2_keys[k]][dim3]);
                for (var l = 0; l < dim3_keys.length; l++) {
                    console.log(stimStruct[stimCats[i]][dim1][dim1_keys[j]][dim2][dim2_keys[k]][dim3][dim3_keys[l]])
                    var shuffled_instances = jsPsych.randomization.sampleWithoutReplacement(["1","2","3","4"]);
                    block1_stims.push({stim:`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[0]}.jpg`})
                    all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[0]}.jpg`);
                    block1_stims = jsPsych.randomization.sampleWithoutReplacement(block1_stims);
                    block2_stims.push({stim:`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[1]}.jpg`})
                    all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[1]}.jpg`);
                    block2_stims = jsPsych.randomization.sampleWithoutReplacement(block2_stims);
                    block3_stims.push({stim:`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[2]}.jpg`})
                    all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[2]}.jpg`);
                    block3_stims = jsPsych.randomization.sampleWithoutReplacement(block3_stims);
                    block4_stims.push({stim:`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[3]}.jpg`})
                    all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[3]}.jpg`);
                    block4_stims = jsPsych.randomization.sampleWithoutReplacement(block4_stims);
                    


                }
            }
        }
    }

//check if the values in block2_stims start with the string 'img/place/new_big_urban'
block1_test1_stims =[];
block2_stims.forEach((obj, index) => {
    if (obj.stim.startsWith('img/place/new_big_urban')) {
        block1_test1_stims.push(obj.stim);
    }
    if (obj.stim.startsWith('img/place/new_small_urban')) {
        block1_test1_stims.push(obj.stim);
    }
    if (obj.stim.startsWith('img/place/new_big_rural')) {
        block1_test1_stims.push(obj.stim);
    }
    
  });




    var timeline = [];
    var preload = {
        type: jsPsychPreload,
        // auto_preload: true
        images: all_stims
    };
    var fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="font-size:60px;">+</div>',
        choices: "NO_KEYS",
        trial_duration: 500,
      };

      var numeric = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="font-size:60px;">this is where the numeric task goes</div>',
        choices: "NO_KEYS",
        trial_duration: 2000,
      };

    var welcome = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "Welcome to the experiment. Press any key to begin."
      };

      var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<div style = 'width:800px; font-size:24px;'><p>In this experiment you will be shown a series of images one at a time. After seeing several images, you will be asked to indicate which image from a set of 3 is most similar to the images you were shown.</p>\
        Good luck! Press any key to begin."

      };

    var goodbye = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "Thank you for participating in the experiment. Press any key to exit."
        };
        

    var stimDisplay = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stim'),
    stimulus_height: 500,
    choices: ['NO_KEYS'],
    trial_duration:1000,
    post_trial_gap: 1000,
    }

    var block1 = {
    timeline: [fixation, stimDisplay,numeric],
    timeline_variables: block1_stims
    }


    var testBlock1 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
          <p style='font-size:25px;'>Which of the following images is most similar to the images you were just shown?</p>
          <div style='width: 1200px;'>
          <div style='float: left; width:400px;'><img src=${block1_test1_stims[0]} style='width:300px'></img>
          <p class='small'><strong>Press the 1 key</strong></p></div>
          <div style='float: left;width:400px'><img src=${block1_test1_stims[1]} style='width:300px'></img>
          <p class='small'><strong>Press the 2 key</strong></p></div>
          <div style='float: left;width:400px'><img src=${block1_test1_stims[2]} style='width:300px'></img>
          <p class='small'><strong>Press the 3 key</strong></p></div>
          </div>
          <div style='width: 1200px;display: flex;justify-content: center; '>
          <p>Press a number key to continue.</p>
            </div>
        `,
        choices: ['1','2','3'],
        // post_trial_gap: 5000
      };
   
    timeline.push(preload);
    timeline.push(welcome);
    timeline.push(instructions);
    timeline.push(block1);
    timeline.push(testBlock1);
    timeline.push(goodbye)


       
    
      

    




    jsPsych.run(timeline);
}
