<?php

function myFunctionForTestTask($someArray)
{
    $square = $someArray[1]['square'];
    $sizeOfSquare = pow($square, 2);
    for ($i = 1; $i <= $sizeOfSquare; ++$i) {
        $isCellShown[$i] = true;
    }

    $spans = [];
    foreach ($someArray as $arr) {

        // Проверка на повторяющиеся значения
        $countValues = array_count_values($arr['cells']);
        foreach ($countValues as $value) {
            if ($value > 1) {
                user_error('Values can not be repeated');
                die;
            }
        }

        // Отсортировать массив
        sort($arr['cells']);
        // Проверка на корректность вводимых значений

        $enteredCells = $arr['cells'];
        $sizeOfSelectedFigure = count($enteredCells);
        $rows = 1;
        $columns = 1;
        $first = $enteredCells[0];
        $previousNumberOfRow = $first;
        $previousNumberOfColumn = $first;
        for ($i = 1; $i < $sizeOfSelectedFigure; ++$i) {
            if (($enteredCells[$i] - $first) % $square == 0) {
                if ((($enteredCells[$i] - $previousNumberOfRow) / $square) == 1) {
                    ++$rows;
                    $previousNumberOfRow = $enteredCells[$i];
                }

            } else {
                if ($enteredCells[$i] == $previousNumberOfColumn) {
                    continue;
                }

                if ($enteredCells[$i] == $previousNumberOfColumn + 1) {
                    ++$columns;
                    $previousNumberOfColumn = $enteredCells[$i];
                }
            }
        }

        if ($sizeOfSelectedFigure != $rows * $columns) {
            user_error('Invalid values was entered');
            die;
        }


        $rowspan = 1;
        $colspan = 1;
        $isCollspanFinished = false;
        for ($i = 1; $i < $sizeOfSelectedFigure; ++$i) {
            $isCellShown[$enteredCells[$i]] = false;
            if (($enteredCells[$i] - $first) % $square == 0) {
                ++$rowspan;
                $isCollspanFinished = true;
            } else {
                if (!$isCollspanFinished) {
                    ++$colspan;
                }
            }
        }


        if ($colspan == 0) {
            $colspan = 1;
        }


        $spans[$first] = [
            "rowspan" => $rowspan,
            "colspan" => $colspan,
            "text" => $arr['text'],
            "align" => $arr['align'],
            "valign" => $arr['valign'],
            "color" => $arr['color'],
            "bgcolor" => $arr['bgcolor'],
        ];
    }


    $cellCounter = 1; ?>


    <table border="1">
        <?php for ($row = 1; $row <= $square; ++$row) { ?>
            <tr>
                <?php for ($col = 1; $col <= $square; ++$col) {
                    if ($isCellShown[$cellCounter]) {
                        $colspanString = "";
                        $rowspanString = "";
                        $textString = $cellCounter;
                        $alignString = "";
                        $valignString = "";
                        $colorString = "";
                        $bgcolorString = "";
                        if (isset($spans[$cellCounter])) {
                            $colspanString = $spans[$cellCounter]["colspan"] ? 'colspan="' . $spans[$cellCounter]["colspan"] . '"' : "";
                            $rowspanString = $spans[$cellCounter]["rowspan"] ? 'rowspan="' . $spans[$cellCounter]["rowspan"] . '"' : "";
                            $textString = $spans[$cellCounter]["text"] ? $spans[$cellCounter]["text"] : $cellCounter;
                            $alignString = $spans[$cellCounter]["align"] ? 'align="' . $spans[$cellCounter]["align"] . '"' : "";
                            $valignString = $spans[$cellCounter]["valign"] ? 'valign="' . $spans[$cellCounter]["valign"] . '"' : "";
                            $colorString = $spans[$cellCounter]["color"] ? 'color="' . $spans[$cellCounter]["color"] . '"' : "";
                            $bgcolorString = $spans[$cellCounter]["bgcolor"] ? 'bgcolor="' . $spans[$cellCounter]["bgcolor"] . '"' : "";

                        }; ?>
                        <td <?php echo $colspanString; ?>
                            <?php echo $rowspanString; ?>
                            <?php echo $alignString; ?>
                            <?php echo $valignString; ?>
                            <?php echo $bgcolorString; ?>
                            >
                            <div class="text">
                                <font <?php echo $colorString; ?> >
                                    <?php echo $textString; ?>
                                </font>
                            </div>
                        </td>
                    <?php }
                    ++$cellCounter;
                } ?>
            </tr>
        <?php } ?>
    </table>
<?php }

$myPost = $_POST;
foreach ($myPost as $blocNumber => $allValuesInBloc) {
    foreach ($allValuesInBloc as $name => $value) {
        if ($name == 'cells') {
            $cellsString = trim(trim($value, ","));
            $cellsArr = explode(",", $cellsString);
            foreach ($cellsArr as $key => $num) {
                $cellsArr[$key] = (int)$num;
            }
            $myPost[$blocNumber]['cells'] = $cellsArr;
        }

        if ($name == "square") {
            $myPost[$blocNumber]['square'] = (int)$value;
        }
    }
}


myFunctionForTestTask($myPost);