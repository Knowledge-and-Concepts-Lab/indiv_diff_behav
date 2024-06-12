// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%% SETUP %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// The entire experiment consists of 12 different runs.
// The 12 runs can be broken into 3 blocks of 4 runs each.
// Each block consists of 4 runs, one for each background - urban day, urban evening, rural day, rural evening. Block order is randomized.
// Each run consists of 24 trials - 3 (faces, place, object) x  2 (dim 1) x 2 (dim 2) x 2 (dim 3).
// for places dim1 = new/old, dim2 = small/big, dim3 = church/house
// for faces dim1 = young/old, dim2 = black/white, dim3 = male/female
// for objects dim1 = new/old, dim2 = small/big, dim3 = vehicle/furniture

// 4 runs completes one entire loop of the dataset (block 1), runs 5-8 are the same as 1-4 (block 2), runs 9-12 are the same as 1-4 (block 3)
// with different orders of images within runs and different orders of runs within the blocks.

// There are also 12 test trials, one for each background that appears at the end of each run. These are randonly scattered across the 12 runs.

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


///wrap whole experiment in the beginExperiment function
function beginExperiment(stimStruct) {
    var jsPsych = initJsPsych( {on_finish: function() {
        // jsPsych.data.displayData();
      }});
    var stimStruct = stimStruct; // this is the stimulus structure that is passed in from the main experiment script

    



function sampleWithoutSequentialRepeats(array, size) { //sampler function that ensures that the same item is not repeated in the sequence
    var sample = [];
    var lastItem = null;
    for (var i = 0; i < size; i++) {
      var item = jsPsych.randomization.sampleWithReplacement(array, 1)[0];
      while (item === lastItem) {
        item = jsPsych.randomization.sampleWithReplacement(array, 1)[0];
      }
      sample.push(item);
      lastItem = item;
    }
    return sample;
  }

  function shuffleRuns(runDict,size,seed){ ///this function randomizes the order of runs while maintaining the block structure
  
    shuffledDict = [];
    jsPsych.randomization.setSeed(seed);
    for (let i = 0; i < Object.keys(runDict).length; i += size) {
        chunk = _.slice(_.values(runDict),i, i + size);

        chunk = jsPsych.randomization.sampleWithoutReplacement(chunk,size);
      shuffledDict.push(...chunk);
    }
    return shuffledDict;

}




const subject_id = jsPsych.randomization.randomID(10); // generate a random subject ID
const filename = `${subject_id}.csv`; //seed the filename that will be saved on osf with the subject ID


    stimCats = Object.keys(stimStruct);
    runDict = {};


background_dict = {
    0: 'urban_day',
    1: 'urban_eve',
    2: 'rural_day',
    3: 'rural_eve'
}


// create placeholders for the stims in each run
run1_stims =[];
run2_stims =[];
run3_stims =[];
run4_stims =[];
run5_stims =[];
run6_stims =[];
run7_stims =[];
run8_stims =[];
run9_stims =[];
run10_stims =[];
run11_stims =[];
run12_stims =[];


all_stims = [];
 //nested dictionary of nback stims. Keys specify odd vs. even and the keys in the sub dictionaries specify the magnitude of the number
nback_stims={
// these are the nback 'conditions'
      'odd':{ 1:[13, 15, 17],
            2:[19, 21,23],
            3:[25,27,29],
            4:[31,33,35],
            5:[37,39,41],
            6:[43,45,47],
            7:[49,51,53],
            8:[55,57,59],
            9:[61,63,65],
            10:[67,69,71],
            11:[73,75,77],
            12:[79,81,83]
        },
    'even':{1:[12, 14, 16],
            2:[18, 20, 22],
            3:[24, 26, 28],
            4:[30, 32, 34],
            5:[36, 38, 40],
            6:[42, 44, 46],
            7:[48, 50, 52],
            8:[54, 56, 58],
            9:[60, 62, 64],
            10:[66, 68, 70],
            11:[72, 74, 76],
            12:[78, 80, 82]
    }
}


    //          Nback Design        //
nback_factors = {
    'parity': ['odd', 'even'],
    'magnitude': [1,2,3,4,5,6,7,8,9,10,11,12]
}

////////////// OLD NBACK CODE (EXCISE LATER) ///////////////////////

// nback_full_design = jsPsych.randomization.factorial(nback_factors, 1);
// nback_seqs = 
// nback_full_design.map(function(item) {
//     return sampleWithoutSequentialRepeats(nback_stims[item['parity']][item['magnitude']],6);
//   });
// console.log(nback_full_design)

// nback_trials=[] // these are all then back trials for a single run
// for(i=0; i<nback_seqs.length; i++){
//     for(j=0; j<nback_seqs[i].length; j++){
//         nback_trials.push({'stimulus':`<div style="font-size:60px;">${nback_seqs[i][j]}</div>`});
//     }
// }

// splitArray = _.chunk(nback_trials, 6);

// // make each item in splitArray a timeline variable
// for (var i = 0; i < splitArray.length; i++) {
//     splitArray[i] = {'array': splitArray[i]}
// }

//////////////////////////////////////////////////////////


for (var i = 0; i < stimCats.length; i++) { // cycle through faces places then objects
    dim1 = Object.keys(stimStruct[stimCats[i]]); // get the first dimension of the stimulus category
    dim1_keys = Object.keys(stimStruct[stimCats[i]][dim1]); // get the keys for the first dimension e.g., young and old for the key age
    for (var j = 0; j < dim1_keys.length; j++) {
        dim2 = Object.keys(stimStruct[stimCats[i]][dim1][dim1_keys[j]]);
        dim2_keys = Object.keys(stimStruct[stimCats[i]][dim1][dim1_keys[j]][dim2]);

        for (var k = 0; k < dim2_keys.length; k++) {
            dim3 = Object.keys(stimStruct[stimCats[i]][dim1][dim1_keys[j]][dim2][dim2_keys[k]]);
            dim3_keys = Object.keys(stimStruct[stimCats[i]][dim1][dim1_keys[j]][dim2][dim2_keys[k]][dim3]);
            for (var l = 0; l < dim3_keys.length; l++) {
          
                // console.log(`img/urban_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`)
                var shuffled_instances = jsPsych.randomization.sampleWithoutReplacement(["1","2","3","4"]);
                run1_stims.push({stim:`img/urban_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`})
                all_stims.push(`img/urban_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`);
                all_stims.push(`img/urban_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${2}.png`); // test images
                // all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[0]}.jpg`);
                // run1_stims = jsPsych.randomization.sampleWithoutReplacement(run1_stims); // shuffle the order of the images within the run

                run2_stims.push({stim:`img/urban_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`})
                all_stims.push(`img/urban_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`);
                all_stims.push(`img/urban_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${2}.png`); // test images
                // all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[1]}.jpg`);
                // run2_stims = jsPsych.randomization.sampleWithoutReplacement(run2_stims); // shuffle the order of the images within the run

                run3_stims.push({stim:`img/rural_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`})
                all_stims.push(`img/rural_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`);
                all_stims.push(`img/rural_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${2}.png`); // test images
                // all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[2]}.jpg`);
                // run3_stims = jsPsych.randomization.sampleWithoutReplacement(run3_stims); // shuffle the order of the images within the run

                run4_stims.push({stim:`img/rural_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`})
                all_stims.push(`img/rural_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`);
                all_stims.push(`img/rural_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${2}.png`); // test images
                // all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[3]}.jpg`);
                // run4_stims = jsPsych.randomization.sampleWithoutReplacement(run4_stims); // shuffle the order of the images within the run
               
            }
        }
    }
}

run1_stims = jsPsych.randomization.sampleWithoutReplacement(run1_stims); // shuffle the order of the images within the run
run2_stims = jsPsych.randomization.sampleWithoutReplacement(run2_stims); // shuffle the order of the images within the run
run3_stims = jsPsych.randomization.sampleWithoutReplacement(run3_stims); // shuffle the order of the images within the run
run4_stims = jsPsych.randomization.sampleWithoutReplacement(run4_stims); // shuffle the order of the images within the run
run5_stims = jsPsych.randomization.sampleWithoutReplacement(run1_stims); // shuffle the order of the images within the run
run6_stims = jsPsych.randomization.sampleWithoutReplacement(run2_stims); // shuffle the order of the images within the run
run7_stims = jsPsych.randomization.sampleWithoutReplacement(run3_stims); // shuffle the order of the images within the run
run8_stims = jsPsych.randomization.sampleWithoutReplacement(run4_stims); // shuffle the order of the images within the run
run9_stims = jsPsych.randomization.sampleWithoutReplacement(run1_stims); // shuffle the order of the images within the run
run10_stims = jsPsych.randomization.sampleWithoutReplacement(run2_stims); // shuffle the order of the images within the run
run11_stims = jsPsych.randomization.sampleWithoutReplacement(run3_stims); // shuffle the order of the images within the run
run12_stims = jsPsych.randomization.sampleWithoutReplacement(run4_stims); // shuffle the order of the images within the run




testArrays ={} // this will be a dictionary of arrays of test images for each background

for(var i=0; i<Object.keys(background_dict).length; i++){
    for (var j = 0; j < stimCats.length; j++) {
        thisArray = [];

        dim1 = Object.keys(stimStruct[stimCats[j]]);
        dim1_keys = Object.keys(stimStruct[stimCats[j]][dim1]);
        for (var k = 0; k < dim1_keys.length; k++) {
            dim2 = Object.keys(stimStruct[stimCats[j]][dim1][dim1_keys[k]]);
            dim2_keys = Object.keys(stimStruct[stimCats[j]][dim1][dim1_keys[k]][dim2]);
    
            for (var l = 0; l < dim2_keys.length; l++) {
                dim3 = Object.keys(stimStruct[stimCats[j]][dim1][dim1_keys[k]][dim2][dim2_keys[l]]);
                dim3_keys = Object.keys(stimStruct[stimCats[j]][dim1][dim1_keys[k]][dim2][dim2_keys[l]][dim3]);
                for (var m = 0; m < dim3_keys.length; m++) {
                    thisArray.push(`img/${background_dict[i]}_${dim1_keys[k]}_${dim2_keys[l]}_${dim3_keys[m]}_${2}.png`)
                   

                }
            }
        }

        testArrays[3*i+j] = jsPsych.randomization.sampleWithoutReplacement(thisArray,8);
    }
}

testArrays = shuffleRuns(testArrays,3); // shuffle within backgrounds 

testStims =[]
for(i=0;i<3;i+=1){
    testStims.push(testArrays[i])
    testStims.push(testArrays[i+3])
    testStims.push(testArrays[i+6])
    testStims.push(testArrays[i+9])
}
  


runDict[0] = run1_stims;
runDict[1] = run2_stims;
runDict[2] = run3_stims;
runDict[3] = run4_stims;
runDict[4] = run5_stims;
runDict[5] = run6_stims;
runDict[6] = run7_stims;
runDict[7] = run8_stims;
runDict[8] = run9_stims;
runDict[9] = run10_stims;
runDict[10] = run11_stims;
runDict[11] = run12_stims;

thisSeed = jsPsych.randomization.randomID(10);
runDict = shuffleRuns(runDict,4,thisSeed);
testStims = shuffleRuns(testStims,4,thisSeed);




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
    trial_duration: 2000,
  };


var blank ={
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;"></div>',
    choices: "NO_KEYS",
    trial_duration: 50,
}

var scanner_trigger = { //trial for the scanner to begin the run
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">Please wait for next TR to begin! :) </div>',
    choices: ['t']
  };


var save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "m4HH5huSMfqE",
    filename: filename,
    data_string: ()=>jsPsych.data.get().csv()
  };

var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press any key to begin."
  };

  var instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<div style = 'width:800px; font-size:24px; text-align:left;'><p>This experiment is divided into 12 `blocks`. Between each block, the scanner will reset and you will have the chance to take a break if you want.\
    The following instructions will go over the structure of a single block.<br><br> In each block, you will be shown a series of\
    images one at a time. These images will remain on the screen for a few seconds then disappear. Please pay attention to the images as they appear.</p>\
    <p> Between successive images you will be presented with a sequence of 6 numbers. Your task is to indicate whether the number you are currently seeing\
    is <i>greater</i> or <i>lesser</i> than the previous number in the sequence. For, example if the sequence of numbers is 5,1,3,4,6,0, you would respond <i>lesser</i>, <i>greater</i>, <i>greater</i>, <i>greater</i>, <i>lesser</i>.</p>\
    <p>On the trackball press the <b>left</b> button to indicate greater and the <b>right</b> button to indicate lesser.</p><br>\
    After seeing several images, you will be presented with a grid of images and asked to indicate which 2 images from the set are most similar to the images you were shown during the block. Please make sure to select exactly 2!</p>\
    Good luck! Press any key to begin."

  };

var goodbye = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Thank you for participating in the experiment. Press any key to exit."
    };
    

// var stimDisplay = {
// type: jsPsychImageKeyboardResponse,
// stimulus: jsPsych.timelineVariable('stim'),
// stimulus_height: 6000,
// choices: ['NO_KEYS'],
// trial_duration:1000,
// post_trial_gap: 0,
// }

// var block1 = {
// timeline: [fixation, stimDisplay],
// // timeline_variables: run1_stims
// timeline_variables: _.merge(_.flatten(run1_stims)),
// }


// var gridTest = {
//     type: jsPsychGridSelect,
//     imageList: ['img/urban_day_old_black_woman_1.png','img/rural_day_old_black_woman_1.png',
// 'img/urban_day_old_black_woman_2.png','img/urban_day_old_small_house_1.png',
// 'img/urban_day_old_big_vehicle_1.png','img/urban_day_young_white_man_1.png',
// 'img/urban_eve_old_black_woman_1.png','img/urban_day_new_small_furniture_1.png'],
//  propertyList: ['a','b','c','d','e','f','g','h']
// }




// testOrderings = [];
// for (var i = 0; i < Object.keys(runDict).length; i++) {
// testOrderings.push(jsPsych.randomization.shuffle([0, 1, 2, 3]));
// }


timeline.push(preload);
timeline.push(welcome);
timeline.push(instructions);


num_reps = 1;
var seqCounter = 0;
for(var i=0; i<num_reps; i++){
    timeline.push(scanner_trigger);

    //decide what order the backgrounds will be in
    // background_order = jsPsych.randomization.shuffle([0,1,2,3]);

    for(var j=0; j< Object.keys(runDict).length; j++){ //this will be Object.keys(runDict).length
        // if (j%4==0){
        //     background_order = jsPsych.randomization.shuffle([0,1,2,3]); //reshuffle every 4 runs
        // }

        //check
        nback_full_design = jsPsych.randomization.factorial(nback_factors, 1);

        nback_seqs = 
        nback_full_design.map(function(item) {
        return sampleWithoutSequentialRepeats(nback_stims[item['parity']][item['magnitude']],6);
        });
        for(var trial=0;trial<runDict[j].length;trial++){
        timeline.push(fixation);
     
        var thisStim = {
            type: jsPsychImageKeyboardResponse,
            // stimulus: runDict[background_order[j%4]][trial].stim,
            stimulus: runDict[j][trial].stim,
            stimulus_height: 500,
            choices: ['NO_KEYS'],
            trial_duration: 6000,
            post_trial_gap: 0,
            data: {
                imageTrial: true,
                sequence: seqCounter,
              }
            }
        timeline.push(thisStim);
        timeline.push(fixation);
        for(var nbackCount=0;nbackCount<6;nbackCount++){
            var thisTrialNum = nback_seqs[trial][nbackCount];
            if (nbackCount==0){
                var firstTrial = true;

            }else{
                var firstTrial = false;
            }
            var thisNback = {
           
               type: jsPsychHtmlMouseResponse,
               trial_duration: 950,
            //    stimulus: function(){return `<div style="font-size:60px;">${thisTrialNum}</div>`},
            stimulus: `<div style="font-size:60px;">${thisTrialNum}</div>`,
            data: {
                nbackTrial: true,
                firstTrial: firstTrial,
                sequence: seqCounter,
                parity:nback_full_design[trial]['parity'],
                magnitude:nback_full_design[trial]['magnitude'],
            
              }
            }

            timeline.push(thisNback);
            timeline.push(blank);
    

       
        }
        seqCounter+=1;
    }
    var testProperties = testStims[j].map((item) => {
        const parts = item.split('/');
        const filename = parts[1].split('.')[0];
        // const nameParts = filename.split('_');
        // return nameParts.slice(2).join('_');
        return filename;
      });
      

      
      
    var gridTest = {
        type: jsPsychGridSelect,
        // imageList: testArrays[3*background_order[j%4]+testOrderings[j][i]],
        imageList: testStims[j],
    //  propertyList: ['a','b','c','d','e','f','g','h']
        propertyList: testProperties,
        data: {
            gridTrial: true
          }
    }
    
    timeline.push(gridTest);
    if (j!=Object.keys(runDict).length-1){ //if not the last run reinstall the scanner trigger
    timeline.push(scanner_trigger);
    }
    }
}

// console.log(timeline)





// var mousteTest = {
//     type:jsPsychHtmlMouseResponse,
//     stimulus:'tmp',
//     trial_duration: 2000,
// }



// timeline.push(block1);
// // timeline.push(testBlock1);
timeline.push(save_data);
// timeline.push(goodbye);

jsPsych.run(timeline);

}

