const {getConnection,getRepository} = require("typeorm");
var fs = require('fs');
const Users = require("../../classModel/usersClass").Users;
const Branches = require("../../classModel/branchClass").Branches;
const moment = require('moment');
const { connected } = require("process");
const leaves_ = require("./leaveModel")

const generateDates = async (startDate, stopDate) =>{
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push({ date: moment(currentDate).format('YYYY-MM-DD') });
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const create_excel_file = async (emp_list, leave, timesheet, biometric, clientdata)=>{
    try{
   var writeStream = fs.createWriteStream("file1.xls");

    if (clientdata.leaves_taken.includes('sick') && clientdata.leaves_taken.length == 1){
    var header="user_id"+"\t"+"first_name"+"\t"+"last_name"+"\t"+"location"+"\t"+"start date"+"\t"+"end date"+"\t"+"biometric"+"\t"+"timesheet"+"\t"+"sick leave taken"+"\t"+"leave left"+"\n";
    writeStream.write(header);
    for (i in emp_list){
        //console.log(emp_list[i].id)
        var row1 = emp_list[i].id+"\t"+emp_list[i].first_name+"\t"+emp_list[i].last_name+"\t"+emp_list[i].location+"\t"+clientdata.date_from+"\t"+clientdata.date_to;
        var row3 = "\t"+"null"
        for (k in biometric){
            if(biometric[k].id == emp_list[i].id){
                var row3 = "\t"+biometric[k].timeSum
            }
        }

        var sick_t = 0
        // var privilege_t = "\t"+"null"
        // var casual_t = "\t"+"null"

        for(j in leave){
            if (leave[j].id == emp_list[i].id && leave[j].leave_type == 'sick'){
                var sick_t = leave[j].leave_taken
            }
            // if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'privilege'){
            //     var privilege_t = "\t"+leave[j].leave_taken
            // }
            // if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'casual'){
            //     var casual_t = "\t"+leave[j].leave_taken
            // }
        }

        var row5 = "\t"+"null"
        for (l in timesheet){
            if (timesheet[l].id == emp_list[i].id){
                //console.log(timesheet[l].total_hrs)
                var row5 = timesheet[l].total_hrs
            }
        }
        var leaveLeft = "\t"+6.5-sick_t
        var row2 = "\n";
        writeStream.write(row1+row3+row5+"\t"+sick_t+"\t"+leaveLeft+row2)
        //console.log(row1+row3+row5+sick_t+privilege_t+casual_t+row2)
    }

    writeStream.close();

        return "data"
}else if(clientdata.leaves_taken.includes('casual') && clientdata.leaves_taken.length == 1){
    var header="user_id"+"\t"+"first_name"+"\t"+"last_name"+"\t"+"location"+"\t"+"start date"+"\t"+"end date"+"\t"+"biometric"+"\t"+"timesheet"+"\t"+"casual leave taken"+"\t"+"leave left"+"\n";
    writeStream.write(header);
    for (i in emp_list){
        //console.log(emp_list[i].id)
        var row1 = emp_list[i].id+"\t"+emp_list[i].first_name+"\t"+emp_list[i].last_name+"\t"+emp_list[i].location+"\t"+clientdata.date_from+"\t"+clientdata.date_to;
        var row3 = "\t"+"null"
        for (k in biometric){
            if(biometric[k].id == emp_list[i].id){
                var row3 = "\t"+biometric[k].timeSum
            }
        }

        //var sick_t = "\t"+"null"
        //var privilege_t = "\t"+"null"
        var casual_t = 0

        for(j in leave){
            // if (leave[j].id == emp_list[i].id && leave[j].leave_type == 'sick'){
            //     var sick_t = "\t"+leave[j].leave_taken
            // }
            // if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'privilege'){
            //     var privilege_t = "\t"+leave[j].leave_taken
            // }
            if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'casual'){
                var casual_t = leave[j].leave_taken
            }
        }
        var leaveLeft = "\t"+6.5-casual_t
        var row5 = "\t"+"null"
        for (l in timesheet){
            if (timesheet[l].id == emp_list[i].id){
                //console.log(timesheet[l].total_hrs)
                var row5 = "\t"+timesheet[l].total_hrs
            }
        }
        var row2 = "\n";
        writeStream.write(row1+row3+row5+"\t"+casual_t+"\t"+leaveLeft+row2)
        //console.log(row1+row3+row5+sick_t+privilege_t+casual_t+row2)
    }

    writeStream.close();

    return "data"
}else if(clientdata.leaves_taken.includes('privilege') && clientdata.leaves_taken.length == 1){
    var header="user_id"+"\t"+"first_name"+"\t"+"last_name"+"\t"+"location"+"\t"+"start date"+"\t"+"end date"+"\t"+"biometric"+"\t"+"timesheet"+"\t"+"privilege taken"+"\t"+"leave left"+"\n";
    writeStream.write(header);
    for (i in emp_list){
        //console.log(emp_list[i].id)
        var row1 = emp_list[i].id+"\t"+emp_list[i].first_name+"\t"+emp_list[i].last_name+"\t"+emp_list[i].location+"\t"+clientdata.date_from+"\t"+clientdata.date_to;
        var row3 = "\t"+"null"
        for (k in biometric){
            if(biometric[k].id == emp_list[i].id){
                var row3 = "\t"+biometric[k].timeSum
            }
        }

       // var sick_t = "\t"+"null"
        var privilege_t =  0 
        //var casual_t = "\t"+"null"

        for(j in leave){
            // if (leave[j].id == emp_list[i].id && leave[j].leave_type == 'sick'){
            //     var sick_t = "\t"+leave[j].leave_taken
            // }
            if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'privilege'){
                var privilege_t = leave[j].leave_taken
            }
            // if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'casual'){
            //     var casual_t = "\t"+leave[j].leave_taken
            // }
        }
        var leaveLeft = "\t"+13-privilege_t
        var row5 = "\t"+"null"
        for (l in timesheet){
            if (timesheet[l].id == emp_list[i].id){
                //console.log(timesheet[l].total_hrs)
                var row5 = "\t"+timesheet[l].total_hrs
            }
        }
        var row2 = "\n";
        writeStream.write(row1+row3+row5+"\t"+privilege_t+"\t"+leaveLeft+row2)
        //console.log(row1+row3+row5+sick_t+privilege_t+casual_t+row2)
    }

    writeStream.close();

    return "data"
}else if(clientdata.leaves_taken.includes('sick') && clientdata.leaves_taken.includes('privilege') && clientdata.leaves_taken.length == 2){
    var header="user_id"+"\t"+"first_name"+"\t"+"last_name"+"\t"+"location"+"\t"+"start date"+"\t"+"end date"+"\t"+"biometric"+"\t"+"timesheet"+"\t"+"sick leave taken"+"\t"+"privilege taken"+"\t"+"leave left"+"\n";
    writeStream.write(header);
    for (i in emp_list){
        //console.log(emp_list[i].id)
        var row1 = emp_list[i].id+"\t"+emp_list[i].first_name+"\t"+emp_list[i].last_name+"\t"+emp_list[i].location+"\t"+clientdata.date_from+"\t"+clientdata.date_to;
        var row3 = "\t"+"null"
        for (k in biometric){
            if(biometric[k].id == emp_list[i].id){
                var row3 = "\t"+biometric[k].timeSum
            }
        }

        var sick_t = 0
        var privilege_t = 0
        //var casual_t = 0

        for(j in leave){
            if (leave[j].id == emp_list[i].id && leave[j].leave_type == 'sick'){
                var sick_t = leave[j].leave_taken
            }
            if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'privilege'){
                var privilege_t = leave[j].leave_taken
            }
            // if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'casual'){
            //     var casual_t = leave[j].leave_taken
            // }
        }
        var leaveLeft = "\t"+ 26-sick_t-privilege_t
        //console.log(leaveLeft)
        var row5 = "\t"+"null"
        for (l in timesheet){
            if (timesheet[l].id == emp_list[i].id){
                //console.log(timesheet[l].total_hrs)
                var row5 = "\t"+timesheet[l].total_hrs
            }
        }
        var row2 = "\n";
        writeStream.write(row1+row3+row5+"\t"+sick_t+"\t"+privilege_t+"\t"+leaveLeft+row2)
        //console.log(row1+row3+row5+sick_t+privilege_t+casual_t+row2)
    }

    writeStream.close();

    return "data"
}else if(clientdata.leaves_taken.includes('casual') && clientdata.leaves_taken.includes('privilege') && clientdata.leaves_taken.length == 2){
    var header="user_id"+"\t"+"first_name"+"\t"+"last_name"+"\t"+"location"+"\t"+"start date"+"\t"+"end date"+"\t"+"biometric"+"\t"+"timesheet"+"\t"+"privilege taken"+"\t"+"casual leave taken"+"\t"+"leave left"+"\n";
    writeStream.write(header);
    for (i in emp_list){
        //console.log(emp_list[i].id)
        var row1 = emp_list[i].id+"\t"+emp_list[i].first_name+"\t"+emp_list[i].last_name+"\t"+emp_list[i].location+"\t"+clientdata.date_from+"\t"+clientdata.date_to;
        var row3 = "\t"+"null"
        for (k in biometric){
            if(biometric[k].id == emp_list[i].id){
                var row3 = "\t"+biometric[k].timeSum
            }
        }

        //var sick_t = 0
        var privilege_t = 0
        var casual_t = 0

        for(j in leave){
            // if (leave[j].id == emp_list[i].id && leave[j].leave_type == 'sick'){
            //     var sick_t = leave[j].leave_taken
            // }
            if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'privilege'){
                var privilege_t = leave[j].leave_taken
            }
            if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'casual'){
                var casual_t = leave[j].leave_taken
            }
        }
        var leaveLeft = "\t"+ 26-sick_t-privilege_t-casual_t
       // console.log(leaveLeft)
        var row5 = "\t"+"null"
        for (l in timesheet){
            if (timesheet[l].id == emp_list[i].id){
                //console.log(timesheet[l].total_hrs)
                var row5 = "\t"+timesheet[l].total_hrs
            }
        }
        var row2 = "\n";
        writeStream.write(row1+row3+row5+"\t"+privilege_t+"\t"+casual_t+"\t"+leaveLeft+row2)
        //console.log(row1+row3+row5+sick_t+privilege_t+casual_t+row2)
    }

    writeStream.close();

    return "data"
}else if(clientdata.leaves_taken.includes('casual') && clientdata.leaves_taken.includes('sick') && clientdata.leaves_taken.length == 2){
    var header="user_id"+"\t"+"first_name"+"\t"+"last_name"+"\t"+"location"+"\t"+"start date"+"\t"+"end date"+"\t"+"biometric"+"\t"+"timesheet"+"\t"+"sick leave taken"+"\t"+"casual leave taken"+"\t"+"leave left"+"\n";
    writeStream.write(header);
    for (i in emp_list){
        //console.log(emp_list[i].id)
        var row1 = emp_list[i].id+"\t"+emp_list[i].first_name+"\t"+emp_list[i].last_name+"\t"+emp_list[i].location+"\t"+clientdata.date_from+"\t"+clientdata.date_to;
        var row3 = "\t"+"null"
        for (k in biometric){
            if(biometric[k].id == emp_list[i].id){
                var row3 = "\t"+biometric[k].timeSum
            }
        }

        var sick_t = 0
        //var privilege_t = 0
        var casual_t = 0

        for(j in leave){
            if (leave[j].id == emp_list[i].id && leave[j].leave_type == 'sick'){
                var sick_t = leave[j].leave_taken
            }
            // if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'privilege'){
            //     var privilege_t = leave[j].leave_taken
            // }
            if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'casual'){
                var casual_t = leave[j].leave_taken
            }
        }
        var leaveLeft = "\t"+ 26-sick_t-privilege_t-casual_t
      //  console.log(leaveLeft)
        var row5 = "\t"+"null"
        for (l in timesheet){
            if (timesheet[l].id == emp_list[i].id){
                //console.log(timesheet[l].total_hrs)
                var row5 = "\t"+timesheet[l].total_hrs
            }
        }
        var row2 = "\n";
        writeStream.write(row1+row3+row5+"\t"+sick_t+"\t"+casual_t+"\t"+leaveLeft+row2)
        //console.log(row1+row3+row5+sick_t+privilege_t+casual_t+row2)
    }

    writeStream.close();

    return "data"
}else{
    var header="user_id"+"\t"+"first_name"+"\t"+"last_name"+"\t"+"location"+"\t"+"start date"+"\t"+"end date"+"\t"+"biometric"+"\t"+"timesheet"+"\t"+"sick leave taken"+"\t"+"privilege taken"+"\t"+"casual leave taken"+"\t"+"leave left"+"\n";
    writeStream.write(header);
    for (i in emp_list){
        //console.log(emp_list[i].id)
        var row1 = emp_list[i].id+"\t"+emp_list[i].first_name+"\t"+emp_list[i].last_name+"\t"+emp_list[i].location+"\t"+clientdata.date_from+"\t"+clientdata.date_to;
        var row3 = "\t"+"null"
        for (k in biometric){
            if(biometric[k].id == emp_list[i].id){
                var row3 = "\t"+biometric[k].timeSum
            }
        }

        var sick_t = 0
        var privilege_t = 0
        var casual_t = 0

        for(j in leave){
            if (leave[j].id == emp_list[i].id && leave[j].leave_type == 'sick'){
                var sick_t = leave[j].leave_taken
            }
            if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'privilege'){
                var privilege_t = leave[j].leave_taken
            }
            if (leave[j].id == emp_list[i].id&& leave[j].leave_type == 'casual'){
                var casual_t = leave[j].leave_taken
            }
        }
        var leaveLeft = "\t"+ 26-sick_t-privilege_t-casual_t
        //console.log(leaveLeft)
        var row5 = "\t"+"null"
        for (l in timesheet){
            if (timesheet[l].id == emp_list[i].id){
                //console.log(timesheet[l].total_hrs)
                var row5 = "\t"+timesheet[l].total_hrs
            }
        }
        var row2 = "\n";
        writeStream.write(row1+row3+row5+"\t"+sick_t+"\t"+privilege_t+"\t"+casual_t+"\t"+leaveLeft+row2)
        //console.log(row1+row3+row5+sick_t+privilege_t+casual_t+row2)
    }

    writeStream.close();

    return "data"
}
    }catch(error){
        throw error
    }
}

const get_location = async (clientdata)=>{
    try{
        let data = await getConnection()
        .getRepository(Branches)
        .createQueryBuilder("brnch")
        .where("status = 1 and id = :id",{
            id: clientdata.location
        })
        .select()
        .getRawMany()
        return data
    }catch(error){
        throw error
    }
}

const create_excel_file2 = async(emp_list, leave, timesheet, biometric, clientdata)=>{ 
    try{
        let location_t = await get_location(clientdata)
        const date_array = await generateDates(clientdata.date_from, clientdata.date_to);
        var writeStream = fs.createWriteStream("file1.xls");
        var location_gr = "Location"+"\t"+location_t[0].brnch_location+"\n";
        writeStream.write(location_gr);
        var date_gr = "Start Date"+"\t"+clientdata.date_from+"\t"+"End Date"+"\t"+clientdata.date_to+"\n";
        writeStream.write(date_gr);
        var biometric_gr = " Biometric Min Hours"+"\t"+clientdata.biometric_hrs_min+"\t"+" Biometric Max Hours"+"\t"+clientdata.biometric_hrs_max+"\n";
        writeStream.write(biometric_gr);
        var timesheet_gr = "Timeheet Min Hours"+"\t"+clientdata.timesheet_hrs_min+"\t"+"Timesheet Max Hours"+"\t"+clientdata.timesheet_hrs_max+"\n\n\n";
        writeStream.write(timesheet_gr);
        var header="Xelp ID"+"\t"+"First Name"+"\t"+"last name"+"\t"+"Casual Leaves Taken"+"\t"+"Privilege Leave Taken"+"\t"+"Sick Leaves Taken"+"\t"+"Paternity Leaves Taken"+"\t"+"Maternity Leaves Taken"+"\t"+"Casual Leaves Left"+"\t"+"Privilege Leaves Left"+"\t"+"Sick Leaves Left"+"\t"+"Date";
        
        for(i in date_array){
            header += "\t"+date_array[i].date
        }
        header += "\t"+"total"+"\n";
        writeStream.write(header);

        for (i in emp_list){
            let employee_details = emp_list[i].xelp_id +"\t"+emp_list[i].first_name+"\t"+emp_list[i].last_name+"\t";
            let sick_t = 0
            let privilege_t = 0
            let casual_t = 0
            let paternity_t = 0
            let maternity_t = 0
            let timesheet_t = 0
            let biometric_t = 0
            let timesheet_total_hours = 0
            let worksheet_total_hours = 0
    
            for(var j = 1; j< leave.length; j++){
                if (leave[j].user_id == emp_list[i].id && leave[j].leave_type == 'sick'){
                    sick_t = leave[j].days
                }
                if (leave[j].user_id == emp_list[i].id && leave[j].leave_type == 'casual'){
                    casual_t = leave[j].days
                }
                if (leave[j].user_id == emp_list[i].id && leave[j].leave_type == 'privilege'){
                    privilege_t = leave[j].days
                }
                if (leave[j].user_id == emp_list[i].id && leave[j].leave_type == 'paternity'){
                    paternity_t = leave[j].days
                }
                if (leave[j].user_id == emp_list[i].id && leave[j].leave_type == 'maternity'){
                    maternity_t = leave[j].days
                }
            }
            var sick_t_l = 6.5-sick_t;
            var casual_t_l = 6.5-casual_t;
            var privilege_t_l = 13-privilege_t;
            employee_details += sick_t+"\t"+casual_t+"\t"+privilege_t+"\t"+paternity_t+"\t"+maternity_t+"\t"+sick_t_l+"\t"+casual_t_l+"\t"+privilege_t_l+"\t"+"timesheet";
            
            for (dd in date_array){
                var t_flg = 0
                for (var k= 0; k < timesheet.length; k++){
                    if(date_array[dd].date == formatDate(timesheet[k].date.toDateString()) && emp_list[i].id == timesheet[k].id){
                        employee_details += "\t" + timesheet[k].total_hrs
                        timesheet_total_hours += timesheet[k].total_hrs
                        t_flg = 1
                    }
                }
                if (t_flg == 0){
                employee_details += "\t" + timesheet_t
                }
            }

            employee_details += "\t"+timesheet_total_hours+"\n"
            let employee_details2 = "-"+"\t"+"-"+"\t"+"-"+"\t"+"-"+"\t"+"-"+"\t"+"-"+"\t"+"-"+"\t"+"-"+"\t"+"-"+"\t"+"-"+"\t"+"-"+"\t"+"biometric";
            for (dd in date_array){
                var b_flg = 0
                for (var m=0; m < biometric.length; m++){
                    if(date_array[dd].date == formatDate(biometric[m].date.toDateString()) && emp_list[i].id == biometric[m].id){
                        let ttt = biometric[k].total_hrs.split(":")
                        let tt2 = ttt[0]+"."+ttt[1]
                        employee_details2 += "\t" + tt2
                        worksheet_total_hours += parseFloat(tt2)
                        b_flg = 1
                    }
                }
                if (b_flg == 0){
                    employee_details2 += "\t" + biometric_t
                }
            }
            employee_details2 += "\t"+worksheet_total_hours+"\n";
            writeStream.write(employee_details)
            writeStream.write(employee_details2)
        }

        //let employee_details = 

        writeStream.close();
        return "data"
    }catch(error){
        throw error 
    }
}

const leave_data = async (clientdata)=>{
    try{        if(clientdata.emp_type == "0"){
        var role3 = `and usr.role_id in (4, 6, 1, 2, 3, 5, 7, 8, 9, 10)`
    }else{
        var role3 = `and usr.role_id in (${clientdata.emp_type})`
    }
        // let query1 = `SELECT usr.id, usr.email, sum(lvs.days) as leave_taken, lvs.leave_type
        // FROM intranet.leaves as lvs
        // LEFT JOIN intranet.users as usr
        // ON usr.id = lvs.user_id
        // where usr.status = 1 and lvs.leave_type = '${clientdata.leaves_taken}' and 
        // usr.branch_id = ${clientdata.location} 
        // ${role3} 
        // and ((lvs.from between "${clientdata.date_from}" and "${clientdata.date_to}") 
        // or (lvs.to between "${clientdata.date_from}" and "${clientdata.date_to}"))
        // group by usr.email;`

        let query1 = `SELECT usr.email, sum(lvs.days) as leave_taken, usr.id, usr.role_id, lvs.leave_type, usr.role_id
        FROM intranet.leaves as lvs
        LEFT JOIN intranet.users as usr
        ON usr.id = lvs.user_id
        where usr.status = 1 and lvs.status = 1 
        and lvs.leave_type in ('sick', 'casual', 'privilege') 
        and usr.branch_id in (${clientdata.location}) ${role3}
        group by usr.email, lvs.leave_type;`;
        console.log(query1)

        let leaveLeft = await getConnection()
        .query(query1)
        .catch(err_msg => {
          console.log(err_msg);
        });
        return leaveLeft;
    }catch(error){
        throw error
    }
}

const biometric_hours_report = async (clientdata) => {
    try{
        if(clientdata.emp_type == "0"){
            var role3 = ``
        }else{
            var role3 = `and usr.role_id in (${clientdata.emp_type})`
        }
        // let query1 = `SELECT usr.id, atd.xelp_id, SEC_TO_TIME( SUM(time_to_sec(atd.work_hrs))) As timeSum, usr.first_name, usr.last_name
        // FROM intranet.attendances as atd
        // LEFT JOIN intranet.users as usr
        // ON usr.emp_id = atd.xelp_id 
        // WHERE usr.status = 1
        // and usr.branch_id = ${clientdata.location}
        // and atd.date between "${clientdata.date_from}"  and "${clientdata.date_to}"
        // ${role3}
        // and atd.work_hrs between "${clientdata.biometric_hrs_min}" and "${clientdata.biometric_hrs_max}"
        // GROUP BY atd.xelp_id
        // order by timesum desc;`

        let query1 = `select usr.id, usr.first_name, usr.emp_id as xelp_id, atd.work_hrs as total_hrs, atd.date, usr.branch_id, usr.role_id
        from intranet.attendances as atd
        LEFT JOIN intranet.users as usr
        ON usr.id = atd.user_id
        where usr.status = 1 and usr.branch_id = ${clientdata.location}
        and atd.date between "${clientdata.date_from}" and "${clientdata.date_to}"
        and atd.work_hrs between "${clientdata.biometric_hrs_min}" and "${clientdata.biometric_hrs_max}"
        ${role3};`

        let biometric_hours = await getConnection()
        .query(query1)
        .catch(err_msg => {
          console.log(err_msg);
        });

        return biometric_hours
    }catch{error}{
        throw error
    }
}

const timesheet_hours_report = async (clientdata) => {
    try{
        if(clientdata.emp_type == "0"){
            var role3 = ``
        }else{
            var role3 = `and usr.role_id in (${clientdata.emp_type})`
        }
        let query1 = `SELECT usr.id, usr.emp_id as xelp_id, wk.hours_spend as total_hrs, wk.date
        FROM intranet.worksheets as wk
        LEFT JOIN intranet.users as usr
        ON usr.id = wk.user_id
        where usr.status = 1 
        and wk.hours_spend between ${clientdata.timesheet_hrs_min} and ${clientdata.timesheet_hrs_max}
        and usr.branch_id = ${clientdata.location}
        and wk.date between "${clientdata.date_from}" and "${clientdata.date_to}" ${role3};`

        //and wk.hours_spend between "${clientdata.timesheet_hrs_min}" and "${clientdata.timesheet_hrs_max}"

        let timesheet_hours = await getConnection()
        .query(query1)
        .catch(err_msg => {
          console.log(err_msg);
        });
        return timesheet_hours
    }catch(error){
        throw error
    }
}

const fetch_emp_details = async (clientdata)=>{
    try{

        if(clientdata.emp_type == "0"){
            var role3 = ``
        }else{
            var role3 = `and usr.role_id in (${clientdata.emp_type})`
        }

        let query1 = `select usr.id, usr.first_name, usr.last_name, usr.email, usr.xelp_email , brnch.location as location, usr.emp_id as xelp_id
                    from intranet.users as usr
                    left join intranet.branches as brnch 
                    on brnch.id = usr.branch_id
                    where usr.status = 1 
                    and usr.branch_id = ${clientdata.location}
                    ${role3}`;
        let data = await getConnection()
        .query(query1)
        .catch(err_msg => {
          console.log(err_msg);
        });
        return data

    }catch(error){
        throw error
    }
}

const generateReport = async (clientdata)=>{
    try{
        let time_sheet = await timesheet_hours_report(clientdata)
        let biometric_hrs = await biometric_hours_report(clientdata)
        let leave_d = await leaves_.topEmpLeave({"location":clientdata.location}, {"startdate":clientdata.date_from, "enddate": clientdata.date_to})
        let emp_details = await fetch_emp_details(clientdata)
        let file2 = await create_excel_file2(emp_details, leave_d, time_sheet, biometric_hrs, clientdata)
   
    return "report created"
    }catch(error){
        throw error
    }
}

module.exports = {
    generateReport
}