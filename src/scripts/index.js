
/**
 * Below is the insert Item Function, this will automatically add the $ in the amount
 */

function insertItem() {

    //Settting Variables to be used in the the rest of the function

    let costName = document.getElementById('item_name_field').value;
    let costAmount = document.getElementById('item_amount_field').value;
    let dateOfCost = document.getElementById('date_of_item_field').value;
    let tableName = document.getElementById('typeOfTrans').value + '_table';

    //Setting Error variables for the error check below
    let costAmountError = document.getElementById('item_amount-error');

    //console.log('THis is the amount ', costAmount, 'this is the name ', costName);

    /**
     * Below is the javascript to create the entry into the table at the bottom of the page.
     */

    if(costName !== '' && costAmount !== '' && dateOfCost !== ''){

        createTableEntry(tableName, 'cost_', costName, costAmount, dateOfCost);


        //TODO check to see if hide class exists on table div if it does do nothing, if it doesn't add it

        //These are here to zero out the fields after valid submission
        document.getElementById('item_name_field').value = '';
        document.getElementById('date_of_item_field').value = '';
        document.getElementById('item_amount_field').value = '';
        //this is here to zero out the display of cost amount if the error is showing after valid submission
        if(costAmountError.textContent !== ''){
            costAmountError.textContent = '';
        }


        //RunTable Total
        tableTotal(tableName);

    } else {
        //TODO: need errors for all fields in Cost

        console.error('Nothing In fields');
        costAmountError.textContent = 'Need To Enter Amount';
        costAmountError.style.color = 'red';
        costAmountError.style.borderColor = 'red';
        costAmountError.focus();
    }

    console.log(tableName);

}

deleteRow = (tableName) => {

    //TODO if you delete all entries and there is none left, you ened to hide table

    $(tableName).on('click', '.fa-window-close', function() {
        $(this).closest("tr").remove();
    });

};

refreshTotal = () => {

    console.log('total Refreshed');

};



createTableEntry = (tableName, className, itemName, amountOfItem, dateOfItem ) => {

    let incomeTableClass = document.getElementById("income-table-cell");
    let costTableClass = document.getElementById("cost-table-cell");
    let tableContainer = document.getElementById("table-container");

    document.getElementById(tableName).getElementsByTagName('tbody')[0].insertRow(0).innerHTML =
        '<tr>' +
        '<td class="' +
        className +
        '-' +
        itemName+
        '">' +
        itemName +
        '</td>' +
        '<td class="'+
        className +
        '-' +
        amountOfItem +
        '">'+
        '$'+
        amountOfItem +
        '<td class="dateof-' +
        className +
        '">' +
        dateOfItem +
        '<span style="float:right;"><i class="fas fa-window-close '+ tableName +'" onclick="deleteRow(' + tableName + ')"></i></span>'+
        '</td>' +
        '</tr>';

    if(tableContainer.classList.contains("hide")){

        tableContainer.classList.remove("hide");
        console.log("The hole container is hidden");

    } if(incomeTableClass.classList.contains("hide")  && tableName === 'income_table'){

        incomeTableClass.classList.remove("hide");
        console.log("I need to unhide Income Table");

    } if (costTableClass.classList.contains("hide") && tableName === 'cost_table') {

        costTableClass.classList.remove("hide");
        console.log("I need to unhide Cost Table");

    }

};

tableTotal = (tableName) => {

    let totalLeftOver = document.getElementById('totalLeftOver').innerHTML;
    totalLeftOver = parseFloat(totalLeftOver.replace(/[^0-9.-]+/g, ''));

    let tableBody = document.getElementById(tableName);
    let whichColumn = 1; // which column in the table has what we want
    let howManyRows = tableBody.rows.length;
    let totalCostAmount = 0;
    let totalIncome = 0;

    tableName = tableName.toString();

    if(tableName === 'cost_table') {

        for (let i=1; i<(howManyRows-1); i++) // skip first and last row (hence i=1, and howManyRows-1)
        {
            let thisTrElem = tableBody.rows[i];
            let thisTdElem = thisTrElem.cells[whichColumn];
            let thisTextNode = thisTdElem.childNodes.item(0);

            thisTextNode = thisTextNode.data.replace(/[^0-9.-]+/g, '');
            let actualNumber = parseFloat(thisTextNode);
            // if you didn't get back the value NaN (i.e. not a number), add into result
            if (!isNaN(actualNumber))
                totalCostAmount += actualNumber;
        }

        console.log(totalLeftOver);

        let numberTotal = totalLeftOver - totalCostAmount;

        return document.getElementById('totalLeftOver').innerHTML = '$' + numberTotal;

    } else if ( tableName === 'income_table' ){

        for (let i=1; i<(howManyRows-1); i++)
        {

            let thisTrElem = tableBody.rows[i];
            let thisTdElem = thisTrElem.cells[whichColumn];
            let thisTextNode = thisTdElem.childNodes.item(0);

            thisTextNode = thisTextNode.data.replace(/[^0-9.-]+/g, '');
            let actualNumber = parseFloat(thisTextNode);
            console.log('This is before adding',actualNumber);
            // if you didn't get back the value NaN (i.e. not a number), add into result
            if (!isNaN(actualNumber))
              totalIncome += actualNumber;
        }

        let numberTotal = totalLeftOver + totalIncome;

        console.log('This is after total', numberTotal);

        return document.getElementById('totalLeftOver').innerHTML = '$' + numberTotal;

    }




};
