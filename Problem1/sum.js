/** Function to calculate the sum of numbers from 1 to n using a loop.
 * 
 * @param {number} n - The number up to which to calculate the sum.
 * @returns {number} - The sum of numbers from 1 to n.
 */
var sum_to_n_a = function(n) {

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum+=i;
    }

    return sum;
};
/** Function to calculate the sum of numbers from 1 to n using recursion.
 * 
 * @param {number} n - The number up to which to calculate the sum.
 * @returns {number} - The sum of numbers from 1 to n.
 */
var sum_to_n_b = function(n) {

    if(n === 1) {
        return 1;
    }
    
    return n + sum_to_n_b(n - 1)

};
/** Function to calculate the sum of numbers from 1 to n using a formula.
 * 
 * @param {number} n - The number up to which to calculate the sum.
 * @returns {number} - The sum of numbers from 1 to n.
 */
var sum_to_n_c = function(n) {
    
    return (n * (n + 1)) / 2;

};

console.log(sum_to_n_a(100))
console.log(sum_to_n_b(100))
console.log(sum_to_n_c(100))
