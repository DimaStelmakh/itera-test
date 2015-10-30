$(document).ready(function () {

    var element = $('#cells_selected_numbers');
    var cellsInfo = {};


    //console.log('arrOfPostedValues: '+arrOfPostedValues);
    //function isNumeric(value){
    //    if(!isNaN(parseFloat(value)) && isFinite(value)){
    //        return true;
    //    } else {
    //        return false;
    //    }
    //}

    function strValueToIntInArrAndSortIt(str) {
        if (str == '' || str === undefined) {
            return str = 0;
        }
        var arr = str.split(',');
        for (var i = 0; i < arr.length; ++i) {
            //if (isNumeric(arr[i])){
            arr[i] = parseInt(arr[i]);
            //}
        }
        arr = arr.sort(function(a,b){return a-b;});
        return arr;
    }

    function isArraysOfMultidimensionalArr1IdentityToArr2(arr1, arr2) {
        for (var i = 0; i < arr1.length; ++i) {
            if (arr1[i].length == arr2.length) {
                var numberOfMatch = 0;
                for (var x = 0; x < arr1[i].length; ++x) {
                    if ((arr1[i][x] === arr2[x])) {
                        ++numberOfMatch;
                    }
                }
                if (numberOfMatch === arr1[i].length) {
                    return true;
                }
            }
        }

        return false;
    }


    var validators = [];
    //
    var validateIntersection = function (dataForValidation) {
        var enteredString = dataForValidation;
        var enteredArr = strValueToIntInArrAndSortIt(enteredString);
        var arrWithEnterdValues = [];

        var valuesThatAlredyPosted = arrOfPostedValues;//$('#cells_selected_numbers').val();

        var allNumbers = [];
        for (var i in valuesThatAlredyPosted){
            var arrValuesThatAlredyPosted = strValueToIntInArrAndSortIt(valuesThatAlredyPosted[i])
            for (var x in arrValuesThatAlredyPosted){
                allNumbers.push(arrValuesThatAlredyPosted[x]);
            }
            //allNumbers.push(strValueToIntInArrAndSortIt(valuesThatAlredyPosted[i]));
            //allNumbers.push
            //console.log('allNumbers['+i+']: '+allNumbers[i]);
        }
        console.log('allNumbers: '+allNumbers);
        console.log('enteredArr: '+enteredArr);
        // todo allNumbers - то что надо, массив со всеми введенными значениями

        var isIntersect = false;

        //for (var i in allNumbers){
        //    for (var x in enteredArr){
        //        //console.log('All values: '+allNumbers[i]);
        //        //console.log('Entered: '+enteredArr[x]);
        //        if (allNumbers[i] == enteredArr[x]){
        //            isIntersect = true;
        //        }
        //    }
        //}

        for (var i = 0; i < allNumbers.length; ++i){
            for (var x = 0; x < enteredArr.length; ++x){
                if (allNumbers[i] == enteredArr[x]){
                    isIntersect = true;
                }
            }
        }

        console.log('isIntersect: '+isIntersect);
        valuesThatAlredyPosted = 0;




        if (isIntersect == true) {
            $('#display_error_intersect_numbers').removeClass('off_errors').addClass('on_errors');
            $('#input_critical_data').addClass('error_border_for_critical_data');
            return false;
        } else {
            $('#display_error_intersect_numbers').removeClass('on_errors').addClass('off_errors');
            $('#input_critical_data').removeClass('error_border_for_critical_data');
        }
        return true;
    };


    //
    var validateUseOnlyCommaAsSeparator = function (dataForValidation) {

        var enteredString = dataForValidation;
        enteredString = enteredString.replace(/,*$/, '');
        var isThisNumeric = false;

        enteredArr = enteredString.split(',');
        for(i in enteredArr){
            if (!($.isNumeric(enteredArr[i]))){
                isThisNumeric = false;
            } else {
                isThisNumeric = true;
            }
        }

        if (isThisNumeric == false) {
            // вывод ошибки
            $('#display_error_wrong_data').removeClass('off_errors').addClass('on_errors');
            $('#input_critical_data').addClass('error_border_for_critical_data');
            return false;
        } else {
            $('#display_error_wrong_data').removeClass('on_errors').addClass('off_errors');
            $('#input_critical_data').removeClass('error_border_for_critical_data');
        }
        return true;
    };

    var validateNumberOfInputCellsAccordingSizeOfSquare = function (dataForValidation) {
        var enteredString = dataForValidation;
        var enteredArr = strValueToIntInArrAndSortIt(enteredString);
        var sizeOfSquare = $('#square_size').val();
        var isGreater = false;
        if (enteredArr.length > sizeOfSquare){
            isGreater = true;
        } else {
            isGreater = false;
        }

        if (isGreater == true) {
            $('#display_error_number_input_cells_more_size_of_square').removeClass('off_errors').addClass('on_errors');
            $('#input_critical_data').addClass('error_border_for_critical_data');
            return false;
        } else {
            $('#display_error_number_input_cells_more_size_of_square').removeClass('on_errors').addClass('off_errors');
            $('#input_critical_data').removeClass('error_border_for_critical_data');
            return true;
        }

    }
    //validators.push(validateIntersection);
    //validators.push(validateUseOnlyCommaAsSeparator);


    var validateFigure = function (dataForValidation){//, sizeOfOneSideOfSquare) {

        var enteredCells = strValueToIntInArrAndSortIt(dataForValidation);

        var square = $('#square_size').val();//sizeOfOneSideOfSquare;
        //console.log('square: '+square);
        var sizeOfSelectedFigure = enteredCells.length;
        //console.log('sizeOfSelectedFigure: '+sizeOfSelectedFigure);
        var rows = 1;
        var columns = 1;
        var first = enteredCells[0];
        var previousNumberOfRow = first;
        var previousNumberOfColumn = first;
        var isCorrectFigure = false;
        for (var i = 1; i < sizeOfSelectedFigure; ++i) {
            if ((enteredCells[i] - first) % square == 0) {
                if (((enteredCells[i] - previousNumberOfRow) / square) == 1) {
                    ++rows;
                    previousNumberOfRow = enteredCells[i];
                }

            } else {
                if (enteredCells[i] == previousNumberOfColumn) {
                    continue;
                }

                if (enteredCells[i] == previousNumberOfColumn + 1) {
                    ++columns;
                    previousNumberOfColumn = enteredCells[i];
                }
            }
        }

        if (sizeOfSelectedFigure == rows * columns) {
            isCorrectFigure = true;
        } else {
            isCorrectFigure = false;
        }

        if (isCorrectFigure == false) {
            $('#display_validation_error_correct_numbers_of_cells').removeClass('off_errors').addClass('on_errors');
            $('#input_critical_data').addClass('error_border_for_critical_data');
            return false;
        } else {
            $('#display_validation_error_correct_numbers_of_cells').removeClass('on_errors').addClass('off_errors');
            $('#input_critical_data').removeClass('error_border_for_critical_data');
            return true;
        }


        //    if (!(enteredString.match(myValidationRegExp))) {
        //        // вывод ошибки
        //        $('#display_error_wrong_data').removeClass('off_errors').addClass('on_errors');
        //        $('#input_critical_data').addClass('error_border_for_critical_data');
        //        return false;
        //    } else {
        //        $('#display_error_wrong_data').removeClass('on_errors').addClass('off_errors');
        //        $('#input_critical_data').removeClass('error_border_for_critical_data');
        //    }
        //    return true;


    };


    validators.push(validateIntersection);
    validators.push(validateUseOnlyCommaAsSeparator);
    validators.push(validateFigure);
    validators.push(validateNumberOfInputCellsAccordingSizeOfSquare);


    var validate = function (dataForValidation) {
        //console.log(validators);
        for (var i = 0; i < validators.length; ++i) {
            //console.log(validators[i]);
            if (!(validators[i](dataForValidation))) {
                return false
            }
        }
        return true;
    };

    var sizeOfSquare = 0;
    //$('#square_size').on('blur', function(){
    //
    //    var sizeOfOneSideOfSquare = $('#square_size').val();
    //    //var enteredString = $('#cells_selected_numbers').val();
    //    //var enteredArr = strValueToIntInArrAndSortIt(enteredString);
    //    ////console.log('enteredArr: '+enteredArr);
    //    sizeOfSquare = Math.pow(sizeOfOneSideOfSquare, 2);
    //    ////alert('sizeOfOneSideOfSquare: '+sizeOfOneSideOfSquare);
    //    //console.log('sizeOfOneSideOfSquare: '+sizeOfOneSideOfSquare);
    //    //console.log('sizeOfSquare: '+sizeOfSquare);
    //    //console.log('enteredArr: '+enteredArr);
    //    //if ()
    //    //return true;
    //
    //});





    var arrOfPostedValues = [];
    var counter = 0;



    $('form').submit(function (e) {
        e.preventDefault();
        var sizeOfOneSideOfSquare = $('#square_size').val();
        if (validate(element.val(), sizeOfOneSideOfSquare)) {

            arrOfPostedValues[counter]= $('#cells_selected_numbers').val();

            var data = {
                square: $('#square_size').val(),
                text: $('#text_displayed_in_cell').val(),
                cells: $('#cells_selected_numbers').val(),
                align: $('#horizontal_align').val(),
                valign: $('#vertical_align').val(),
                color: $('#text_color').val(),
                bgcolor: $('#cell_background_color').val()
            };


            ++counter;
            cellsInfo[counter] = data;


            sizeOfOneSideOfSquare = $('#square_size').val();
            //console.log('sizeOfOneSideOfSquare: '+sizeOfOneSideOfSquare);

            $('#square_size').prop('disabled', 'true');


            $.ajax({
                type: "POST",
                url: "main.php",
                data: cellsInfo
            }).success(function (data) {
                $('#results').html(data);
            }).fail(function (e) {
                console.log(e);
            });
        }
        return false;
    });
});





