var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
 runSearch();
});

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Would you like to start shopping?",
        choices: [
          "Yes",
          "No"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Yes":
          showInventory();
          break;
  
        case "No":
          console.log("See you next time!")
          connection.end();
          break;
        }
      });
  }
  
  function showInventory(){
      var query = "SELECT * FROM products";
      connection.query(query, function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Product id: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + "|| Price: " + res[i].price
          + " || Quanity: " + res[i].stock_quantity);
        }
        shop();
      });
    }

    function shop() {
      inquirer
      .prompt([{
        name: "prodID",
        type: "input",
        message: "Enter the product id of the item you'd like to purchase."
      },
      {
       name: "quantity",
       type: "input",
       message: "How many of this item would you like to purchase?" 
      },
    ]).then(function(answer) {
       var itemWanted = answer.prodID;
       var amount = answer.quantity;
       
       //function that handles the purchase from sql database
       makePurchase(itemWanted, amount);
    });
    };

    function makePurchase(itemWanted, amount) {
      var query = "SELECT * FROM products WHERE ?"
      connection.query(query, {item_id: itemWanted}, function(err,res) {
        if(err)throw err;
        if(amount <= res[0].stock_quantity){
          var totalCost = res[0].price * amount;
          console.log("Perfect. We will get to work filling that order for you!");
          console.log("Your total cost of " + amount + " " + res[0].product_name + " is $" + totalCost);
          connection.query("UPDATE products SET stock_quantity = " + (res[0].stock_quantity -  amount) + " WHERE item_id = " + itemWanted);
          
        } else {
          console.log("I'm sorry we don't have enough of " + res[0].product_name + "in stock to complete your order :( ");
          showInventory();
        }
        
      })
    };