// base code from https://gist.github.com/pradeepbheron/e6129c9fd9bc74e814d0#file-pull-and-sync-data-between-google-doc-spreadsheet-and-mysql-gs

function myMySQLFetchData() { 
  
  var conn = Jdbc.getConnection('jdbc:mysql://127.0.0.1:3306/employee_db', 'username', 'pass'); // Change it as per your database credentials

  var stmt = conn.createStatement();
  var start = new Date(); // Get script starting time
  
  var rs = stmt.executeQuery('SELECT id,emp_name, emp_code FROM employee_details GROUP BY 1 LIMIT 1000'); // It sets the limit of the maximum nuber of rows in a ResultSet object
  
  //change table name as per your database structure
   
  var doc = SpreadsheetApp.getActiveSpreadsheet(); // Returns the currently active spreadsheet
  var cell = doc.getRange('a1');
  var row = 0;
  var getCount = rs.getMetaData().getColumnCount(); // Mysql table column name count.
  
  for (var i = 0; i < getCount; i++){  
     cell.offset(row, i).setValue(rs.getMetaData().getColumnName(i+1)); // Mysql table column name will be fetch and added in spreadsheet.
  }  
  
  var row = 1; 
  while (rs.next()) {
    for (var col = 0; col < rs.getMetaData().getColumnCount(); col++) { 
      cell.offset(row, col).setValue(rs.getString(col + 1)); // Mysql table column data will be fetch and added in spreadsheet.
    }
    row++;
  }
  
  rs.close();
  stmt.close();
  conn.close();
  var end = new Date(); // Get script ending time
  Logger.log('Time elapsed: ' + (end.getTime() - start.getTime())); // To generate script log. To view log click on View -> Logs.
}
