
/**
 * Below is the insert Item Function, this will automatically add the $ in the amount
 */

function insertItem() {

    //Settting Variables to be used in the the rest of the function

    let costName = document.getElementById('item_name_field').value;
    let costAmount = document.getElementById('item_amount_field').value;
    let catOfCost = document.getElementById('catOfTrans').value;
    let tableName = document.getElementById('typeOfTrans').value + '_table';

    //Setting Error variables for the error check below
    let costAmountError = document.getElementById('item_amount-error');

    //console.log('THis is the amount ', costAmount, 'this is the name ', costName);

    /**
     * Below is the javascript to create the entry into the table at the bottom of the page.
     */

    if(costName !== '' && costAmount !== '' && catOfCost !== ''){

        createTableEntry(tableName, 'cost_', costName, costAmount, catOfCost);


        //TODO check to see if hide class exists on table div if it does do nothing, if it doesn't add it

        //These are here to zero out the fields after valid submission
        document.getElementById('item_name_field').value = '';
        document.getElementById('catOfTrans').value = '';
        document.getElementById('item_amount_field').value = '';
        //this is here to zero out the display of cost amount if the error is showing after valid submission
        if(costAmountError.textContent !== ''){
            costAmountError.textContent = '';
        }


        //RunTable Total
        tableTotal(tableName, costAmount, catOfCost);

    } else {
        //TODO: need errors for all fields in Cost

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

    //let totalLeftOver = document.getElementById('totalLeftOver').innerHTML;
    //totalLeftOver = parseFloat(totalLeftOver.replace(/[^0-9.-]+/g, ''));

    let incomeTableBody = document.getElementById('income_table');
    let incomeWhichColumn = 1;
    let incomeHowManyRows = incomeTableBody.rows.length;

    let costTableBody = document.getElementById('cost_table');
    let costWhichColumn = 1;
    let costHowManyRows = costTableBody.rows.length;


    let totalCostAmount = 0;
    let totalIncome = 0;


    for (let i=1; i<(incomeHowManyRows-1); i++)
    {
        let thisTrElem = incomeTableBody.rows[i];
        let thisTdElem = thisTrElem.cells[incomeWhichColumn];
        let thisTextNode = thisTdElem.childNodes.item(0);

        thisTextNode = thisTextNode.data.replace(/[^0-9.-]+/g, '');
        let actualIncome = parseFloat(thisTextNode);
        // if you didn't get back the value NaN (i.e. not a number), add into result
        if (!isNaN(actualIncome))
            totalIncome += actualIncome ;
    }

    for (let k=1; k<(costHowManyRows-1); k++) // skip first and last row (hence i=1, and howManyRows-1)
    {
        let thisTrElem = costTableBody.rows[k];
        let thisTdElem = thisTrElem.cells[costWhichColumn];
        let thisTextNode = thisTdElem.childNodes.item(0);

        thisTextNode = thisTextNode.data.replace(/[^0-9.-]+/g, '');
        let actualCost = parseFloat(thisTextNode);
        // if you didn't get back the value NaN (i.e. not a number), add into result
        if (!isNaN(actualCost))

            totalIncome -= actualCost;
    }

    return document.getElementById('totalLeftOver').innerHTML = '$' + totalIncome.toString();

};



createTableEntry = (tableName, className, itemName, amountOfItem, catOfItem ) => {

    let incomeTableClass = document.getElementById("income-table-cell");
    let costTableClass = document.getElementById("cost-table-cell");
    let tableContainer = document.getElementById("table-container");

    /*
    This is here in case you want to use the date for a reason
    let newDate = new Date();
    let todayDate = newDate.getFullYear()+'-'+("0" + (newDate.getMonth()+1)).slice(-2)+'-'+("0" + newDate.getDate()).slice(-2);

    console.log('Date of Item', dateOfItem);
    console.log('Todays Date', todayDate);*/

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
        '<td class="catof-' +
        className +
        '">' +
        catOfItem +
        '<span style="float:right;"><i class="fas fa-window-close '+ tableName +'" onclick="deleteRow(' + tableName + ')"></i></span>'+
        '</td>' +
        '</tr>';

    if(tableContainer.classList.contains("hide")){

        tableContainer.classList.remove("hide");

    } if(incomeTableClass.classList.contains("hide")  && tableName === 'income_table'){

        incomeTableClass.classList.remove("hide");

    } if (costTableClass.classList.contains("hide") && tableName === 'cost_table') {

        costTableClass.classList.remove("hide");

    }

};

tableTotal = (tableName, costAmount) => {

    let today = new Date();
    let totalLeftOver = document.getElementById('totalLeftOver').innerHTML;
    totalLeftOver = parseFloat(totalLeftOver.replace(/[^0-9.-]+/g, ''));

    let totalCostAmount = 0 + costAmount;
    let total = parseFloat(costAmount);

    tableName = tableName.toString();

    if(tableName === 'cost_table') {

        let costTotal = 0;

        let numberTotal = totalLeftOver - total;
        costTotal = parseFloat(costTotal + costAmount);

        document.getElementById('totalLeftOver').innerHTML = '$' + numberTotal;
        document.getElementById('totalCostMonthly').innerHTML = '$' + costTotal;

    } else if ( tableName === 'income_table'){

        let numberTotal = totalLeftOver + total;
        let totalIncome = 0;

        totalIncome = parseFloat(totalIncome + costAmount);

        document.getElementById('totalLeftOver').innerHTML = '$' + numberTotal;
        document.getElementById('totalIncomeMonthly').innerHTML = '$' + totalIncome;

    }




};
