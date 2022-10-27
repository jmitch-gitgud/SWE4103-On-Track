
function GetSheetNames(filename)
{
    var XLSX = require("xlsx");
    const result = [];

    if (filename !== undefined)
    {
        if(filename.slice(-4) === "xlsx")
        {
            var workbook = XLSX.readFile(filename);

            workbook.SheetNames.forEach( row => {
                result.push( { label: row, value: workbook.SheetNames.indexOf(row)})
            });
        }
    }
    
    return result;
}

exports.GetSheetNames = GetSheetNames;