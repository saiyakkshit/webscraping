

let table = base.getTable('base name');
let url = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=0e359a08ec45dfee5d29a8358ec6a201&units=metric');
let json = await url.json();
let initialTemp = json.main.temp;

let query = await table.selectRecordsAsync();
let records = query.records;

for (let record of records) {
  let city = record.getCellValueAsString('City');
  let cityUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e359a08ec45dfee5d29a8358ec6a201&units=metric`);
  let cityJson = await cityUrl.json();
  let cityTemp = cityJson.main.temp.toString(); // Convert to a string
  await table.updateRecordAsync(record.id, { 'Temperature': cityTemp });
}

// Update the initial temperature for London separately
await table.updateRecordAsync(records[0].id, { 'Temperature': initialTemp.toString() });
