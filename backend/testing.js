function getDay(d)
{
  d = new Date(d);
  var date = new Date();
  date.setDate(d.getDate() + 1);
  return date;
}

console.log(getDay(2022-12-01));