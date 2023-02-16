function convertData() {
  incoming_data = document.getElementById('incoming_data').value;
  console.log(incoming_data);

  for ([i, row] of incoming_data.split('\n').entries()) {
    low_trim_row = row.toLowerCase().trim();
    splited_row = low_trim_row.split('_');
    camelRow = splited_row[0] + splited_row[1][0].toUpperCase() + splited_row[1].slice(1);
    console.log(camelRow.padEnd(25, ' ') + '!'.repeat(i+1));
  }
}
