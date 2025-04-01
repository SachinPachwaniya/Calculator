const input = document.getElementById("inputBox")
const buttons = document.querySelectorAll("button")


let expression = "";

function appendValue(a){
    console.log(a);
    expression += a;
    input.value = expression; 
}
function appendOperator(value){
    expression += value
    input.value = expression;
}
function clearDisplay(){
      expression = "";
      input.value = "";   
}
function deleteBtn(){
   expression = expression.slice(0,-1) ; 
    input.value = expression;
}
function calculate() {
    try {
        // Create a new function to evaluate the expression
        const evaluateExpression = new Function('return ' + expression);
        // Compute the result
        const result = evaluateExpression();
        // Update the expression and input field with the result
        expression = result.toString();
        input.value = expression;
    } catch (error) {
        // Handle any errors that occur during evaluation
        expression = 'Error';
        input.value = expression;
    }
}


