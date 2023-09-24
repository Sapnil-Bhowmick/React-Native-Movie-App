const Date = (value) => {

    const month_list = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log(value)

    var val = value
    
    var year = val.split("-")[0]
    var month = val.split("-")[1]
    var day = val.split("-")[2]

    var month_map = month_list[month-1]

   var final_date = month_map + " " + day + "," + " " + year

    console.log(final_date)


 
    return final_date
 }
 
 export default Date; 