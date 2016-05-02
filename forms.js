//Questions: 1) was it necessary for me to separate each employee div into its own
//class in order for the .data() to work? I did (LINE 75) because I read that I needed to
//somewhere... but I commented it out, and it doesn't seem to have affected anything...
// 2) could I have combined all of the functions under one event handler for the second section?
// 3) What is the purpose of the "array" variable? I see that it's storing all of the objects
//that are being created, but I don't think that data is being used, right? Unless somehow the .data()
//thing is connected to it. Is that just preparing us to eventually link it to a database?

$(document).ready(function() {
    var array = [];
    var totalAnnualSalaries = 0;
    var totalMonthlySalaries = 0;
    var employeeCounter = 0;
    var salaryToBeRemoved = 0;

    //SECTION 1: FOR POPULATING THE DOM WITH THE INITIAL INFO FOR EACH EMPLOYEE
    //listen for "submit" events triggered by the button on the employee info form
    $('#employeeinfo').on('submit', function(event) {
      event.preventDefault();

    //serialize an array of objects, each object containing a newly entered employee
      var values = {};
      $.each($('#employeeinfo').serializeArray(), function(i, field) {
        values[field.name] = field.value;
      })

    // clear out inputs
      $('#employeeinfo').find('input[type=text]').val('');

    // add to list
      array.push(values);

    //call the function to increase employeeCounter variable by 1
      increaseEmployeeCounter();

    //call the function to push new employee info to the DOM
      appendDom(values);

    // call the function to add current employee's annual salary to the
    //totalAnnualSalary variable
      addSalaryToTotal(values);

    //call the function to calculate monthly salaries based on annual salaries
      getMonthlySalary();

    // call the function to update the monthly salary field on the page
      reportMonthlySalary();
    });

    //SECTION 2: FOR REMOVING AN EMPLOYEE AND THE EMPLOYEE'S SALARY UPON CLICKING
    //Retrieve the salary data stored in the clicked employee's div
     $('#container').on('click', ':button', retrieveSalaryData);

    //Subtract the employee's annual salary from the total annual salaries
     $('#container').on('click', ':button', subtractSalaryFromTotal);

    //Update the DOM with the new monthly salary info
     $('#container').on('click', ':button', reportMonthlySalary);

    //delete the employee div
     $('#container').on('click', ':button', deleteClicked);


    //SECTION 3: All of the functions being used in the event handlers, above, are built below
    function appendDom(empInfo) {
      $('#container').append('<div class="person"></div>');
      var $el = $('#container').children().last();

      $el.append('<button type="button">Delete</button>' + '<p>' + employeeCounter
      + ' Name:' + empInfo.employeefirstname + ' ' + empInfo.employeelastname
      + ' ' + ' ID:' + empInfo.employeeidnumber + ' ' + ' Title:' +
      empInfo.employeejobtitle + ' ' + ' Salary:' + empInfo.employeesalary + '</p>');

      //I'm not sure if the next line is necessary...
      //$el.addClass('employee' + (employeeCounter - 1)); //adds an individual class to each employee
      $el.data('salary', empInfo.employeesalary);
    }

    function addSalaryToTotal(empInfo) {
      totalAnnualSalaries += Number(empInfo.employeesalary);
    }

    function getMonthlySalary() {
      totalMonthlySalaries = Math.round(totalAnnualSalaries/12);
    }

    function increaseEmployeeCounter() {
      employeeCounter += 1;
    }

    function reportMonthlySalary() {
      $('.monthly-salary').text(totalMonthlySalaries);
    }

    function deleteClicked() {
      $(this).closest('.person').remove();
    }

    function retrieveSalaryData () {
      salaryToBeRemoved = $(this).closest('.person').data('salary');
    }

    function subtractSalaryFromTotal () {
      totalAnnualSalaries -= salaryToBeRemoved;
      getMonthlySalary();
    }
});
