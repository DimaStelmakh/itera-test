$(document).ready(function () {

    var element = $('#cells_selected_numbers');
    var sizeOfSquare = $('#square_size');
    var cellsInfo = {};


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


    var validatorsForEnteredCells = [];
    var validatorsForSizeOfSquare = [];
    //
    var validateIntersection = function (dataForValidation) {
        var enteredString = dataForValidation;
        var enteredArr = strValueToIntInArrAndSortIt(enteredString);
        var valuesThatAlredyPosted = arrOfPostedValues;//$('#cells_selected_numbers').val();

        var allNumbers = [];
        for (var i in valuesThatAlredyPosted){
            var arrValuesThatAlredyPosted = strValueToIntInArrAndSortIt(valuesThatAlredyPosted[i])
            for (var x in arrValuesThatAlredyPosted){
                allNumbers.push(arrValuesThatAlredyPosted[x]);
            }
        }

        var isIntersect = false;
        for (var i = 0; i < allNumbers.length; ++i){
            for (var x = 0; x < enteredArr.length; ++x){
                if (allNumbers[i] == enteredArr[x]){
                    isIntersect = true;
                }
            }
        }
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
            if (enteredArr[i].indexOf('.') == true){
                isThisNumeric = false;

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
        var sizeOfSquare = parseInt($('#square_size').val());
        var allNumbersInSquare = Math.pow(sizeOfSquare, 2);
        var maxInEnteredArray = Math.max.apply(null, enteredArr);

        var isGreater = false;
        if ((enteredArr.length > allNumbersInSquare) || (maxInEnteredArray > allNumbersInSquare)){
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

    };



    var validateFigure = function (dataForValidation){

        var enteredCells = strValueToIntInArrAndSortIt(dataForValidation);

        var square = $('#square_size').val();
        var sizeOfSelectedFigure = enteredCells.length;
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
    };


    validatorsForEnteredCells.push(validateIntersection);
    validatorsForEnteredCells.push(validateUseOnlyCommaAsSeparator);
    validatorsForEnteredCells.push(validateFigure);
    validatorsForEnteredCells.push(validateNumberOfInputCellsAccordingSizeOfSquare);


    var validateEnteredSizeOfSquare = function (dataForValidation){
        var ValueForEnteredSizeOfSquare = dataForValidation;
        var lengthOfValueForEnteredSizeOfSquare = ValueForEnteredSizeOfSquare.length;

        var isEmpty = false;
        if (lengthOfValueForEnteredSizeOfSquare < 1){
            isEmpty = true;
        }

        if (isEmpty == true) {
            $('#display_error_empty_field_for_size_of_square').removeClass('off_errors').addClass('on_errors');
            $('#input_critical_data_size').addClass('error_border_for_critical_data');
            return false;
        } else {
            $('#display_error_empty_field_for_size_of_square').removeClass('on_errors').addClass('off_errors');
            $('#input_critical_data_size').removeClass('error_border_for_critical_data');
            return true;
        }

    };

    validatorsForSizeOfSquare.push(validateEnteredSizeOfSquare);


    var validateForEnteredCells = function (dataForValidation) {
        for (var i = 0; i < validatorsForEnteredCells.length; ++i) {
            if (!(validatorsForEnteredCells[i](dataForValidation))) {
                return false
            }
        }
        return true;
    };

    var validateForSizeOfSquare = function (dataForValidation) {
        for (var i = 0; i < validatorsForSizeOfSquare.length; ++i) {
            if (!(validatorsForSizeOfSquare[i](dataForValidation))) {
                return false
            }
        }
        return true;
    };


    var arrOfPostedValues = [];
    var counter = 0;

    $('form').submit(function (e) {
        e.preventDefault();
        //var sizeOfOneSideOfSquare = $('#square_size').val();
        if ((validateForEnteredCells(element.val())) && (validateForSizeOfSquare(sizeOfSquare.val()))) {



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
            arrOfPostedValues[counter]= $('#cells_selected_numbers').val();

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





