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


/// HERE IS THE SET OF THINGS THAT I'M CHANGING IN THIS CURRENT CODING SESSION:
    // ADDING DEMO RUN THAT USES ANIMAL IMAGES BUT OTHERWISE HAS EXACT SAME PROTOCOL AS THE CURRENT TASK (stim, number task, fixation, repeat)



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



var run1_stims = ['AnimalsWarmup/birds/barn_owl1.jpg',
                'AnimalsWarmup/birds/penguin1.jpg',
                'AnimalsWarmup/birds/cardinal1.jpg',
                'AnimalsWarmup/birds/robin1.jpg',
                'AnimalsWarmup/mammals/elephant1.jpg',
                'AnimalsWarmup/mammals/gorilla1.jpg',
                'AnimalsWarmup/mammals/horse1.jpg'];

var testStims = ['AnimalsWarmup/birds/barn_owl2.jpg',
                'AnimalsWarmup/birds/penguin2.jpg',
                'AnimalsWarmup/birds/cardinal2.jpg',
                'AnimalsWarmup/birds/robin2.jpg', 
                'AnimalsWarmup/mammals/elephant2.jpg',
                'AnimalsWarmup/mammals/gorilla2.jpg',
                'AnimalsWarmup/mammals/horse2.jpg'];

    

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



var runDict = [];
runDict[0] = run1_stims;




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

    
var long_fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 8000,
  };
    

var blank ={
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;"></div>',
    choices: "NO_KEYS",
    trial_duration: 50,
}

var scanner_trigger = { //trial for the scanner to begin the run
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">Please wait for next TR to begin!</div>',
    choices: ['t']
  };



    
var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press any key to begin."
  };
    
    
    
    
    ///  now with scrollable instructions
    
    var instructions_pages = {
        type: jsPsychInstructions,
        pages: [
            'In this study we are interested in understanding how the brain processes visual information.<br>This experiment is divided into 12  &apos;blocks&apos; of trials. Between each block, the scanner will reset and you will have the chance to take a break if you want.<br>\
            The following instructions will go over the structure of a single block.<br><br> In each block, you will be shown a series of\
            images one at a time. These images will remain on the screen for a few seconds then disappear.<strong> Your primary job is to study these images as they appear.</strong> At the end of the block you will be asked to make a judgment based on your memory of the images, so study them carefully.',
            
            'To help you from getting too bored or sleepy, you will also do a second task in between images.<br>In the second task, you will see a series of numbers one at a time. For each number, your job is to decide whether it is larger or smaller than the preceding number. For, example if the sequence of numbers is 5,1,3,4,6,0, you would respond beginning with the 1: smaller, larger, larger, larger, smaller. On the trackball press the <b>left</b> button to indicate smaller and the <b>right</b> button to indicate larger.<br><p>So on each trial, you will first (a) study an image, then (b) do the number judgment task.</p>',
            
            'At the end of each block of trials, you will be shown a grid of images. Your job is to decide which <b>two images</b> in the grid are most similar to the items you studied. Select the two most similar items by using the trackball and clicking on your choices. Please make sure to select exactly two! </p>\At the beginning of the first block you will have the opportunity to practice the task once with animal images. Before beginning, make sure to ask the experimenter any questions you may have. <strong>When you are ready, press "Next" to begin.</strong>'
            ],
        show_clickable_nav: true
    };


var goodbye = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Thank you for participating in the experiment. Press any key to exit."
    };
    




timeline.push(preload);
timeline.push(welcome);
timeline.push(instructions_pages);

    
    
    
    
// RUNNING TRIALS
num_reps = 1;
var seqCounter = 0;
for(var i=0; i<num_reps; i++){
    timeline.push(scanner_trigger);
    timeline.push(long_fixation);

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
            stimulus: runDict[j][trial],
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
      
      
    var gridTest = {
        type: jsPsychGridSelect,
        // imageList: testArrays[3*background_order[j%4]+testOrderings[j][i]],
        imageList: testStims[j],
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
// timeline.push(goodbye);

jsPsych.run(timeline);

}

