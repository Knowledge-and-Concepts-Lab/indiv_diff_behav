
function beginExperiment(stimStruct) {
    var jsPsych = initJsPsych();
    var stimStruct = stimStruct;

    stimCats = Object.keys(stimStruct);
    runDict = {};

background_dict = {
    0: 'urban_day',
    1: 'urban_eve',
    2: 'rural_day',
    3: 'rural_eve'
}
block1_stims =[];
block2_stims =[];
block3_stims =[];
block4_stims =[];

all_stims = [];

nback_stims={
    // 'odd':{1:[15, 17, 19, 21, 23],
    //        2:[25, 27, 29, 31, 33],
    //        3:[35, 37, 39, 41, 43],
    //        4:[45, 47, 49, 51, 53],
    //        5:[55, 57, 59, 61, 63],
    //        6:[65, 67, 69, 71, 73]},
    // 'even':{1:[16, 18, 20, 22, 24],
    //         2:[26, 28, 30, 32, 34],
    //         3:[36, 38, 40, 42, 44],
    //         4:[46, 48, 50, 52, 54],
    //         5:[56, 58, 60, 62, 64],
    //         6:[66, 68, 70, 72, 74]}

      'odd':{   1:[13, 15, 17],
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

nback_factors = {
    'parity': ['odd', 'even'],
    'magnitude': [1,2,3,4,5,6,7,8,9,10,11,12]
}



function sampleWithoutSequentialRepeats(array, size) {
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
nback_full_design = jsPsych.randomization.factorial(nback_factors, 1);
nback_seqs = 
nback_full_design.map(function(item) {
    return sampleWithoutSequentialRepeats(nback_stims[item['parity']][item['magnitude']],6);
  });
console.log(nback_full_design)

nback_trials=[]
for(i=0; i<nback_seqs.length; i++){
    for(j=0; j<nback_seqs[i].length; j++){
        nback_trials.push({'stimulus':`<div style="font-size:60px;">${nback_seqs[i][j]}</div>`});
    }
}

splitArray = _.chunk(nback_trials, 6);

// make each item in splitArray a timeline variable
for (var i = 0; i < splitArray.length; i++) {
    splitArray[i] = {'array': splitArray[i]}
}



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
                // console.log(stimStruct[stimCats[i]][dim1][dim1_keys[j]][dim2][dim2_keys[k]][dim3][dim3_keys[l]])
                console.log(`img/urban_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`)
                var shuffled_instances = jsPsych.randomization.sampleWithoutReplacement(["1","2","3","4"]);
                block1_stims.push({stim:`img/urban_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`})
                all_stims.push(`img/urban_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`);
                all_stims.push(`img/urban_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${2}.png`);
                // all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[0]}.jpg`);
                block1_stims = jsPsych.randomization.sampleWithoutReplacement(block1_stims);

                block2_stims.push({stim:`img/urban_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`})
                all_stims.push(`img/urban_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`);
                all_stims.push(`img/urban_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${2}.png`);
                // all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[1]}.jpg`);
                block2_stims = jsPsych.randomization.sampleWithoutReplacement(block2_stims);

                block3_stims.push({stim:`img/rural_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`})
                all_stims.push(`img/rural_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`);
                all_stims.push(`img/rural_day_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${2}.png`);
                // all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[2]}.jpg`);
                block3_stims = jsPsych.randomization.sampleWithoutReplacement(block3_stims);

                block4_stims.push({stim:`img/rural_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`})
                all_stims.push(`img/rural_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${1}.png`);
                all_stims.push(`img/rural_eve_${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${2}.png`);
                // all_stims.push(`img/${stimCats[i]}/${dim1_keys[j]}_${dim2_keys[k]}_${dim3_keys[l]}_${shuffled_instances[3]}.jpg`);
                block4_stims = jsPsych.randomization.sampleWithoutReplacement(block4_stims);
               
            }
        }
    }
}

testArrays ={}
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


runDict[0] = block1_stims;
runDict[1] = block2_stims;
runDict[2] = block3_stims;
runDict[3] = block4_stims;



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
var blank ={
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;"></div>',
    choices: "NO_KEYS",
    trial_duration: 50,
}
  var numeric = {
    type: jsPsychHtmlMouseResponse,
    // stimulus: function(){return `<div style="font-size:60px;">${jsPsych.timelineVariable('num')}</div>`},

    // choices: "NO_KEYS",
    trial_duration: 2000,
    timeline: ()=>{ return jsPsych.timelineVariable('array')},
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
post_trial_gap: 0,
}

var block1 = {
timeline: [fixation, stimDisplay],
// timeline_variables: block1_stims
timeline_variables: _.merge(_.flatten(block1_stims)),
}





// var gridTest = {
//     type: jsPsychGridSelect,
//     imageList: ['img/urban_day_old_black_woman_1.png','img/rural_day_old_black_woman_1.png',
// 'img/urban_day_old_black_woman_2.png','img/urban_day_old_small_house_1.png',
// 'img/urban_day_old_big_vehicle_1.png','img/urban_day_young_white_man_1.png',
// 'img/urban_eve_old_black_woman_1.png','img/urban_day_new_small_furniture_1.png'],
//  propertyList: ['a','b','c','d','e','f','g','h']
// }




testOrderings = [];
for (var i = 0; i < 3; i++) {
    testOrderings.push(jsPsych.randomization.shuffle([0, 1, 2, 3]));
}
num_reps = 1;

for(var i=0; i<num_reps; i++){

    //decide what order the backgrounds will be in
    background_order = jsPsych.randomization.shuffle([0,1,2,3]);

    for(var j=0; j<2; j++){ //this will be Object.keys(runDict).length

        //check

        nback_seqs = 
        nback_full_design.map(function(item) {
        return sampleWithoutSequentialRepeats(nback_stims[item['parity']][item['magnitude']],6);
        });
        for(var trial=0;trial<runDict[j].length;trial++){
        timeline.push(fixation);
        var thisStim = {
            type: jsPsychImageKeyboardResponse,
            stimulus: runDict[background_order[j]][trial].stim,
            stimulus_height: 500,
            choices: ['NO_KEYS'],
            trial_duration:1000,
            post_trial_gap: 0,
            }
        timeline.push(thisStim);
        for(var nbackCount=0;nbackCount<6;nbackCount++){
            var thisTrialNum = nback_seqs[trial][nbackCount] //future will need to pick the right seq out of 12
            var thisNback = {
           
               type: jsPsychHtmlMouseResponse,
               trial_duration: 500,
            //    stimulus: function(){return `<div style="font-size:60px;">${thisTrialNum}</div>`},
            stimulus: `<div style="font-size:60px;">${thisTrialNum}</div>`,
            }

            timeline.push(thisNback);
            timeline.push(blank);
            console.log('this',nback_seqs[4*i+j][nbackCount])

       
        }
    }
    var gridTest = {
        type: jsPsychGridSelect,
        imageList: testArrays[3*background_order[j]+testOrderings[j][i]],
     propertyList: ['a','b','c','d','e','f','g','h']
    }
    
    timeline.push(gridTest);
    }
}

console.log(timeline)





var mousteTest = {
    type:jsPsychHtmlMouseResponse,
    stimulus:'tmp',
    trial_duration: 2000,
}

// var testBlock1 = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: `
//       <p style='font-size:25px;'>Which of the following images is most similar to the images you were just shown?</p>
//       <div style='width: 1200px;'>
//       <div style='float: left; width:400px;'><img src=${block1_test1_stims[0]} style='width:300px'></img>
//       <p class='small'><strong>Press the 1 key</strong></p></div>
//       <div style='float: left;width:400px'><img src=${block1_test1_stims[1]} style='width:300px'></img>
//       <p class='small'><strong>Press the 2 key</strong></p></div>
//       <div style='float: left;width:400px'><img src=${block1_test1_stims[2]} style='width:300px'></img>
//       <p class='small'><strong>Press the 3 key</strong></p></div>
//       </div>
//       <div style='width: 1200px;display: flex;justify-content: center; '>
//       <p>Press a number key to continue.</p>
//         </div>
//     `,
//     choices: ['1','2','3'],
//     // post_trial_gap: 5000
//   };

// timeline.push(fixation);
// timeline.push(mousteTest);
// for (var i = 0; i < splitArray[0]['array'].length; i++) {
//     var tmp = {
      
//         type: jsPsychHtmlMouseResponse,
//         // stimulus: function(){return `<div style="font-size:60px;">${splitArray[0]['array'][i]}</div>`},
//         stimulus: splitArray[0]['array'][i]['stimulus'],
//         trial_duration:500

//     }
// timeline.push(tmp);
// }
timeline.push(preload);
// timeline.push(welcome);
// timeline.push(instructions);
// timeline.push(block1);
// // timeline.push(testBlock1);
// timeline.push(goodbye);

jsPsych.run(timeline);

}

