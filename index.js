var selectedRow = null;
function onFormSubmit(){
    event.preventDefault();
    var formdata = readFormData();
    if(validationform(formdata)) {
        if(selectedRow === null){
            insertRecord(formdata);
        }else{
            updatedata(formdata);
    
        }
        saveData();

    }
    document.getElementById('name').value = '';
    document.getElementById('Sid').value = '';
    document.getElementById('email').value = '';
    document.getElementById('contact').value = '';
}

//to get the data

function readFormData(){
    var formdata = {};
    formdata["name"] = document.getElementById("name").value;
    formdata["id"] = document.getElementById("Sid").value;
    formdata["email"] = document.getElementById("email").value;
    formdata["contact"] = document.getElementById("contact").value;

    return formdata;

}

// insert data into table
function insertRecord (data){
    var table = document.getElementById("Studentrecords").getElementsByTagName('tbody')[0];
    var newrow = table.insertRow(table.length);

    var cell1 = newrow.insertCell(0);
    cell1.innerHTML = data.name;

    var cell2 = newrow.insertCell(1);
    cell2.innerHTML = data.id;

    var cell3 = newrow.insertCell(2);
    cell3.innerHTML = data.email;

    var cell4 = newrow.insertCell(3);
    cell4.innerHTML = data.contact;

    var cell5 = newrow.insertCell(4);
    cell5.innerHTML = `<button onclick="onEdit(this)">edit</button> <button onclick="onDelete(this)">delete</button>`

}

//edit the data
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('name').value = selectedRow.cells[0].innerHTML;
    document.getElementById('Sid').value = selectedRow.cells[1].innerHTML;
    document.getElementById('email').value = selectedRow.cells[2].innerHTML;
    document.getElementById('contact').value = selectedRow.cells[3].innerHTML;
}

// update the value after edit

function updatedata(formdata){
    selectedRow.cells[0].innerHTML = formdata.name;
    selectedRow.cells[1].innerHTML = formdata.id;
    selectedRow.cells[2].innerHTML = formdata.eid;
    selectedRow.cells[3].innerHTML = formdata.contact;

}

//delete the data
function onDelete(td){
    if(confirm('delete the record?')){
        var row = td.parentElement.parentElement;
        document.getElementById('Studentrecords').deleteRow(row.rowIndex);

        document.getElementById('name').value = '';
        document.getElementById('Sid').value = '';
        document.getElementById('email').value = '';
        document.getElementById('contact').value = '';

        saveData();


    }

}


//form validation

function validationform(formdata){
    const nameRegex = /^[A-Za-z]+$/;
    const idRegex = /^[0-9]+$/;
    const contactRegex = /^[0-9]+$/;

    if(!nameRegex.test(formdata.name)){
        alert("invalid name");
        return false;

    }

    if(!idRegex.test(formdata.id)){
        alert("invalid id");
        return false;

    }

    if(!contactRegex.test(formdata.contact)){
        alert("invalid contact");
        return false;

    }
    return true;


}


// save data to local storage

function saveData(){
    var table = document.getElementById("Studentrecords").getElementsByTagName('tbody')[0];
    var records = [];

    for(var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var record = {
            name: row.cells[0].innerHTML,
            id: row.cells[1].innerHTML,
            email: row.cells[2].innerHTML,
            contact: row.cells[3].innerHTML
        };
        records.push(record);

    }
    localStorage.setItem('studentRecords',JSON.stringify(records));
}

//load data from local storage

function loadData(){
    var records = JSON.parse(localStorage.getItem('studentRecords') || '[]');
    for(var i = 0; i < records.length; i++){
        insertRecord(records[i]);
    }
}

// on loading the page 
window.onload = loadData;

