
function NameToDate(sheetName)
{
    let initDate = sheetName.slice(-5);
    let currentDay = parseInt(initDate.slice(-2));
    let currentMonth = parseInt(initDate.substring(0, 2));
    let currentYear = new Date();
    currentYear = currentYear.getFullYear();
    let dateList = [currentYear + "-" + initDate];

    for(let i = 1; i < 5; i++)
    {
        switch(currentMonth)
        {
            case 1:
                if(currentDay == 31)
                {
                    currentMonth++;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }

                break;
                
            case 2:
                if(currentYear % 4 == 0)
                {
                    if(currentYear % 100 != 0 || currentYear % 400 == 0)
                    {
                        if(currentDay == 29)
                        {
                            currentMonth++;
                            currentDay = 1;
                        }
                        else
                        {
                            currentDay++;
                        }
                    }
                    else
                    {
                        if(currentDay == 28)
                        {
                            currentMonth++;
                            currentDay = 1;
                        }
                        else
                        {
                            currentDay++;
                        }
                    }
                }
                else
                {
                    if(currentDay == 28)
                    {
                        currentMonth++;
                        currentDay = 1;
                    }
                    else
                    {
                        currentDay++;
                    }
                }
                
                break;
                
            case 3:
                if(currentDay == 31)
                {
                    currentMonth++;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }
                
                break;
                
            case 4:
                if(currentDay == 30)
                {
                    currentMonth++;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }
                
                break;
                
            case 5:
                if(currentDay == 31)
                {
                    currentMonth++;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }
                
                break;
                
            case 6:
                if(currentDay == 30)
                {
                    currentMonth++;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }
                
                break;
                
            case 7:
                if(currentDay == 31)
                {
                    currentMonth++;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }
                
                break;
                
            case 8:
                if(currentDay == 31)
                {
                    currentMonth++;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }
                
                break;
                
            case 9:
                if(currentDay == 30)
                {
                    currentMonth++;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }
                
                break;
                
            case 10:
                if(currentDay == 31)
                {
                    currentMonth++;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }
                
                break;
                
            case 11:
                if(currentDay == 30)
                {
                    currentMonth++;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }
                
                break;
            
            default:
                if(currentDay == 31)
                {
                    currentYear++;
                    currentMonth = 1;
                    currentDay = 1;
                }
                else
                {
                    currentDay++;
                }
                
                break;
        }

        let tempMonth = "" + currentMonth;
        let tempDay = "" + currentDay;
       
        if(currentMonth < 10)
        {
            tempMonth = "0" + currentMonth;
        }
       
        if(currentDay < 10)
        {
            tempDay = "0" + currentDay;
        }

        dateList.push(currentYear + "-" + tempMonth + "-" + tempDay);
    }

    return dateList;
}

exports.NameToDate = NameToDate;