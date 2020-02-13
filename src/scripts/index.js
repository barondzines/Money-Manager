(function f() {
'use strict';
}());

import '../styles/style.css';

/**
 * Below is the insert Item Function, this will automatically add the $ in the amount
 */

function deleteItem(id){


    let element = document.getElementById(id).id;
    console.log(element);
    //element.remove();

}

function insertItem(){

    //Setting Variables to be used in the the rest of the function
    let costName = document.getElementById('item_name_field').value;
    let costAmount = document.getElementById('item_amount_field').value;
    let catOfCost = document.getElementById('catOfTrans').value;
    let typeOfTrans = document.getElementById('typeOfTrans').value;

    //Setting Error variables for the error check below
    let costAmountError = document.getElementById('item_amount-error');

    /**
     * Below is the javascript to create the entry into the table at the bottom of the page.
     */

    if(costName !== '' && costAmount !== '' && catOfCost !== ''){

        /**
         * THis is the function to inset a single cell item on the front page
         */
        createSingleItem( catOfCost, costAmount, costName, typeOfTrans );


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
        moneyTotals(typeOfTrans, costAmount, catOfCost);

    } else {
        //TODO: need errors for all fields in Cost

        costAmountError.textContent = 'Need To Enter Amount';
        costAmountError.style.color = 'red';
        costAmountError.style.borderColor = 'red';
        costAmountError.focus();
    }

}

function createSingleItem(catOfCost, costAmount, costName, typeOfTrans){

    let transName = typeOfTrans.toString();
    let singleItem = document.createElement('div');

    if(transName === 'cost'){
        singleItem.setAttribute('class', 'cell text-center single-item');
        singleItem.setAttribute('id', '' + costName.replace(/ +/g, "_"));
        singleItem.innerHTML =
            '<div class="grid-x grid-padding-x align-middle align-center single-item-container">'+
            '<div class="cell shrink transIcon">'+
            '<i class="fas fa-file-invoice fa-2x"></i>' +
            '</div>'+
            '<div class="cell small-4 text-left transName">'+
            costName +
            '<p>'+
             catOfCost +
            '</p>' +
            '</div>'+
            '<div class="cell auto transAmount">'+
            '$' +
            costAmount +
            '</div>' +
            '</div>' +
            '<span class="close-icon" onclick="deleteItem(' + costName.replace(/ +/g, "_") + ')"><i class="fas fa-window-close"></i></span>';

        document.getElementById('cost-container').appendChild(singleItem);

    } else if(transName === 'income'){
        singleItem.setAttribute('class', 'cell text-center single-item');
        singleItem.setAttribute('id', '' + costName.replace(/ +/g, "_") + '_item' + '');
        singleItem.innerHTML =
            '<div class="grid-x grid-padding-x align-middle align-center single-item-container">'+
            '<div class="cell shrink transIcon">'+
            '<i class="fas fa-file-invoice fa-2x"></i>' +
            '</div>'+
            '<div class="cell small-4 text-left transName">'+
            costName +
            '<div class="subtitle">'+
            catOfCost +
            '</div>' +
            '</div>'+
            '<div class="cell auto transAmount money">'+
            '$' +
            costAmount +
            '</div>' +
            '</div>'+
            '<span class="close-icon" onclick="deleteItem(' + costName.replace(/ +/g, "_") + "_item" + ')"><i class="fas fa-window-close'+ " " + costName.replace(/ +/g, "")+'"></i></span>';

        document.getElementById('income-container').appendChild(singleItem);

    }


}

function refreshTotal(){

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

}

function moneyTotals(typeOfTrans, costAmount){

    let today = new Date();
    let totalLeftOver = document.getElementById('totalLeftOver').innerHTML;
    totalLeftOver = parseFloat(totalLeftOver.replace(/[^0-9.-]+/g, ''));

    let totalCostAmount = 0 + costAmount;
    let total = parseFloat(costAmount);

    typeOfTrans = typeOfTrans.toString();

    if(typeOfTrans === 'cost') {

        let costTotal = 0;

        let numberTotal = totalLeftOver - total;
        costTotal = parseFloat(costTotal + costAmount);

        document.getElementById('totalLeftOver').innerHTML = '$' + numberTotal;
        document.getElementById('totalCostMonthly').innerHTML = '$' + costTotal;

    } else if ( typeOfTrans === 'income'){

        let numberTotal = totalLeftOver + total;
        let totalIncome = 0;

        totalIncome = parseFloat(totalIncome + costAmount);

        document.getElementById('totalLeftOver').innerHTML = '$' + numberTotal;
        document.getElementById('totalIncomeMonthly').innerHTML = '$' + totalIncome;

    }


}

window.insertItem = insertItem;
window.deleteItem = deleteItem;
