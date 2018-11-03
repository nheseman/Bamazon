//Require node packages
const inquirer = require('inquirer');
const mysql = require('mysql');

//Connect to mySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'Bamazon'
});

//Query database and display results to console
function displayInventory() {
    queryStock = 'SELECT * FROM products';
    connection.query(queryStock, function (err, data) {
        if (err) throw err;

        console.log('\n');
        console.log('------------------');
        console.log('Current Offerings: ');
        console.log('------------------\n');

        var stockDis = '';
        for (var i = 0; i < data.length; i++) {
            stockDis = '';
            stockDis += 'Product ID: ' + data[i].item_id + '  |  ';
            stockDis += 'Product Name: ' + data[i].product_name + '  |  ';
            stockDis += 'Department: ' + data[i].department_name + '  |  ';
            stockDis += 'Price: $' + data[i].price + '\n';
            console.log(stockDis);
        }
        console.log("------------------------------------------------------------------------------------\n");
        promptUserPurchase();
    })
}
//Evalute user input
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole number for the quantity.';
    }
}
//Inquirer Sale Prompts
function promptUserPurchase() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Enter the ID number of the item you would like to purchase.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many of this item would you like?',
            validate: validateInput,
            filter: Number
        }]
    ).then(function (input) {
        var item = input.item_id;
        var quantity = input.quantity;

//Update database and display final Sales info
        var queryStock = 'SELECT * FROM products WHERE ?';
        connection.query(queryStock, { item_id: item }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('Sorry but that is an invalid Item ID.');
                displayInventory();
            } else {
                var productData = data[0];

                if (quantity <= productData.stock_quantity) {
                    console.log("\n\n---------------------------------------------------------------------------\n");
                    console.log('Your order has been placed.');

                    var updateStock = 'Update products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    connection.query(updateStock, function (err, data) {
                        if (err) throw err;

                        console.log('Your total is $' + productData.price * quantity);
                        console.log('Thank You. We appreciate your business');
                        console.log("\n----------------------------------------------------------------------------\n");
                        connection.end();
                    })
                } else {
                    console.log("\n\n\n----------------------------------------------------------------------------\n");
                    console.log('We do not currently have that volume on hand. Sorry for any inconvenience');
                    console.log('Please enter a new quantity or a different product.');
                    console.log("\n----------------------------------------------------------------------------\n");
                    displayInventory();
                }
            }
        })
    })
}
function runBamazon() {
    displayInventory();
}
runBamazon();