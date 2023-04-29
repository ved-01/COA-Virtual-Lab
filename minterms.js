
function createTable(tableData) {


    var table = document.createElement('table');
    //add class truth_table to table
    table.classList.add("truth_table");
    table.setAttribute("id","truth_table");




    var tableBody = document.createElement('tbody');
    var tableHead = document.createElement('thead');
    //make first row th
    var firstRow = document.createElement('tr');
    tableData[0].forEach(function(cellData) {
      var cell = document.createElement('th');
      if(cellData == " "){
        cell.classList.add("space");
        cell.appendChild(document.createTextNode(''));
      }
      else{cell.appendChild(document.createTextNode(cellData));}

      firstRow.appendChild(cell);
    });
    tableHead.appendChild(firstRow);

  

    for (var i = 1; i < tableData.length; i++) {
      var row = document.createElement('tr');
      tableData[i].forEach(function(cellData) {
        var cell = document.createElement('td');
        if(cellData == " "){
          cell.classList.add("space");
          cell.appendChild(document.createTextNode(''));
        }
        else{
          cell.appendChild(document.createTextNode(cellData));
        }

        row.appendChild(cell);
      });
      tableBody.appendChild(row);
    }

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    if(document.getElementById("truth_table")){
      document.getElementById("truth_table").remove();
    }

    var div = document.getElementById('tablediv');
    div.appendChild(table);
    //if any table already exists, remove it

  }

function enterExpressions(expressionData){
    //for every string in the list add it to the div with id expression_list
    var expressionList = document.getElementById("expressionDiv");

    //check if it has a child div with class expression, if so remove it
    if(document.getElementsByClassName("expressionText").length > 0){
      document.getElementsByClassName("expressionText")[0].remove();
    }


    //create a child div with class expression
    var expressionDiv = document.createElement("div");
    expressionDiv.classList.add("expressionText");

    //now add all the expressions to the div
    for(var i = 0; i < expressionData.length; i++){
      var expression = document.createElement("p");
      expression.appendChild(document.createTextNode(expressionData[i]));
      expressionDiv.appendChild(expression);
    }
    expressionList.appendChild(expressionDiv);
  }

function booleanSolver(binTruthTable){
    var inputLetters = [];
    var outputLetters = [];



    var firstRow = binTruthTable[0];
    var truthTable = binTruthTable.slice(1);
    for (var i = 0; i < firstRow.length; i++){
      if(firstRow[i] != " "){
        outputLetters.push({
          letter: firstRow[i],
          index: i,
        });
      }
      else {
        inputLetters = inputLetters.concat(outputLetters);
        outputLetters = [];
      }
    }



    var finalEquations = [];
    for (var outputIter = 0; outputIter < outputLetters.length; outputIter++){
      var outputLetter = outputLetters[outputIter].letter;
      var outputIndex = outputLetters[outputIter].index;

      var inputArray = [];

      //! If the output var is 1, push the input vars to the inputArray
      for(var i = 0; i < truthTable.length; i++){
        var temp = [];
        for(var j = 0; j < inputLetters.length; j++){
          if (truthTable[i][outputIndex] == 1){
            temp.push(truthTable[i][inputLetters[j].index]);
          }
        }
        if(temp.length != 0){
          inputArray.push(temp);
        }

      }

      var layers = [inputArray]
      var inputLength = inputLetters.length;
      while (true){
        var map = {};
        var lastLayer = layers[layers.length - 1].slice();
        var temp = [];
        //? Categorize based off the number of 1's
        for (var i = 0; i < layers[layers.length  - 1].length; i++){
          var temp = layers[layers.length  - 1][i].filter(function(n){ return n == 1 });
          if(temp.length in map){

          }
          else {
            map[temp.length] = [];
          }
          map[temp.length].push(layers[layers.length  - 1][i]);
        }

        var temp = []; //? Reseting temp
        var tempDupCheck = [];

        //? Check neighbouring bits

        //! Missing figuring out how to remove the merged arrays
        for (var i = 0; i < inputLength+1; i++){
          var next = i + 1;
          if(next == inputLength+1){
            next = 0;
          }
          if (map[i] != undefined && map[next] != undefined){
              for (var j = 0; j < map[i].length; j++){
                for (var k = 0; k < map[next].length; k++){
                  //see how many of the two arrays are the same
                  var diff = 0;
                  var index = 0;
                  for (var l = 0; l < map[i][j].length; l++){
                    if(map[i][j][l] != map[next][k][l]){
                      diff++;
                      index = l;
                    }
                  }
                  //? If difference is one, push to temp
                  if (diff == 1){
                    var index1 = lastLayer.indexOf(map[i][j]);
                    lastLayer.splice(index1,1);
                    var index2 = lastLayer.indexOf(map[next][k]);
                    lastLayer.splice(index2,1);



                    var tempArr = map[i][j].slice();
                    tempArr[index] = "-";
                    if (tempDupCheck.indexOf(tempArr.join("")) == -1){
                      tempDupCheck.push(tempArr.join(""));
                      temp.push(tempArr);
                    }
                  }
                }
              }
            }
        }
        layers[layers.length - 1] = lastLayer;



        if (temp.length == 0){
          break
        }
        else {

          layers.push(temp);
        }

      }

      //ERROR: NEED TO REMOVE DUPLICATES

      //? Converting to an equation
      var finalEquation = "";
      finalEquation += outputLetter + " = ";

      for (var i = 0; i < layers.length; i++){
        for (var j = 0; j < layers[i].length; j++){
          var temp = "";
          for (var k = 0; k < layers[i][j].length; k++){
            if (layers[i][j][k] == 1){
              temp += inputLetters[k].letter;
            }
            else if (layers[i][j][k] == 0){
              temp += inputLetters[k].letter + "'";
            }
          }
          finalEquation += temp + " + ";
        }
      }
      finalEquation = finalEquation.slice(0,-3);
      finalEquations.push(finalEquation);


    }

    return finalEquations;



  }
function binarizer(num,length){
    var bin = num.toString(2);
    while(bin.length < length){
      bin = "0" + bin;
    }

    var binArr = bin.split("");
    return binArr;
}
function outputEval(val,functionterms,isMax){
    if (functionterms.indexOf(val) == -1){
        if (isMax){
            return '1';
        }
        return '0';
    }
    else {
        if (isMax){
            return '0';
        }
        return '1';
    }
}
function evaluator(inputValue,inputLetters,isMax){
    // var minTerms = document.getElementById("minTerms").value;
    // var inputVariables = document.getElementById("inputVariables").value;
    var minTerms = inputValue;
    var inputVariables = inputLetters;
    var outputVariables = "Y";

    var minTermsArr = minTerms.split(",");
    //mapping the minTerms to integers
    for (var i = 0; i < minTermsArr.length; i++){
        minTermsArr[i] = parseInt(minTermsArr[i]);
    }


    var inputVariablesArr = inputVariables.split(",");
    var outputVariablesArr = outputVariables.split(",");

    var inputLength = inputVariablesArr.length;
    var truthTableHeader = inputVariablesArr.concat([' ']).concat(outputVariablesArr);

    //! Generate Truth Table
    var truthTable = [];
    for (var i = 0; i < Math.pow(2,inputLength); i++){
        var temp = binarizer(i,inputLength);
        temp = temp.concat([' ']);
        var output =outputEval(i,minTermsArr,isMax);
        temp = temp.concat(output);

        truthTable.push(temp);
    }
    truthTable.unshift(truthTableHeader);
    createTable(truthTable);
    var finalEquations = booleanSolver(truthTable);
    enterExpressions(finalEquations);

}



function validate(isMax){
    var inputVal = document.getElementById("inputValue").value;
    var inputLetter = document.getElementById("inputLetters").value;
    evaluator(inputVal,inputLetter,isMax);
    return false;
}

evaluator('1,2,3,4','A,B,C,D',true);
