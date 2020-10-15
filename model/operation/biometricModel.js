const Biometrics = require("../../classModel/biometricsClass").Biometrics;
const Attendance = require("../../classModel/attendanceClass").Attendances;
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const { getConnection } = require("typeorm");
const { forEach } = require("async");
const { json } = require("body-parser");
const readXlsxFile = require('read-excel-file/node');
const fs = require("fs");

const uploadBiometricData = async function (clientData, clientData2, clientData3) {
    try {
        let check_biometric = await getConnection()
            .getRepository(Biometrics)
            .createQueryBuilder("bio")
            .where("status = 1 and month = :month and year = :year and branch_id = :location",
                {
                    month: clientData2.month,
                    year: clientData2.year,
                    location: clientData2.branch_id
                })
            .select()
            .getOne()

        if (check_biometric) {
            return "0"
        }
        let filename_ = null
        if (clientData3) {
            filename_ = clientData3.filename
        }

        let data = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Biometrics)
            .values([{
                branch_id: clientData2.branch_id,
                month: clientData2.month,
                file_name: filename_,
                year: clientData2.year,
                status: '1',
                created_at: new Date()
            }])
            .execute();
        return data;
    } catch (error) {
        throw error;
    }
};

const searchBiometricBranchWise = async function (clientData) {
    try {
        let data = await getConnection()
            .getRepository(Biometrics)
            .createQueryBuilder("biometric")
            .where("biometric.status = 1 and biometric.branch_id = :branch_id", { branch_id: clientData.branch_id })
            .select([
                "biometric.biometric_id as biometric_id",
                "biometric.file_name as File_Name",
                "biometric.month as Month",
                "biometric.year as Year",
                "biometric.branch_id as Location",
                "biometric.created_at as Date_Uploaded",
                "biometric.updated_at as Last_Modified"
            ])
            .orderBy("biometric.biometric_id", 'DESC')
            .getRawMany()
        return data;
    }
    catch (error) {
        throw error
    }
};

const searchBiometricMonthWise = async function (clientData) {
    try {
        let data = await getConnection()
            .getRepository(Biometrics)
            .createQueryBuilder("biometric")
            .where("biometric.status = 1 and biometric.month = :month", { month: clientData.month })
            .select([
                "biometric.biometric_id as biometric_id",
                "biometric.file_name as File_Name",
                "biometric.month as Month",
                "biometric.year as Year",
                "biometric.branch_id as Location",
                "biometric.created_at as Date_Uploaded",
                "biometric.updated_at as Last_Modified"
            ])
            .orderBy("biometric.biometric_id", 'DESC')
            .getRawMany()
        return data;
    }
    catch (error) {
        throw error
    }
};

const searchBiometricYearWise = async function (clientData) {
    try {
        let data = await getConnection()
            .getRepository(Biometrics)
            .createQueryBuilder("biometric")
            .where("biometric.status = 1 and biometric.year = :year", { year: clientData.year })
            .select([
                "biometric.biometric_id as biometric_id",
                "biometric.file_name as File_Name",
                "biometric.month as Month",
                "biometric.year as Year",
                "biometric.branch_id as Location",
                "biometric.created_at as Date_Uploaded",
                "biometric.updated_at as Last_Modified"
            ])
            .orderBy("biometric.biometric_id", 'DESC')
            .getRawMany()
        return data;
    }
    catch (error) {
        throw error
    }
};

const searchBiometricAll = async function (clientData) {
    try {
        let data = await getConnection()
            .getRepository(Biometrics)
            .createQueryBuilder("biometric")
            .where("biometric.status = 1")
            .select([
                "biometric.biometric_id as biometric_id",
                "biometric.file_name as File_Name",
                "biometric.month as Month",
                "biometric.year as Year",
                "biometric.branch_id as Location",
                "biometric.created_at as Date_Uploaded",
                "biometric.updated_at as Last_Modified"
            ])
            .orderBy("biometric.biometric_id", 'DESC')
            .getRawMany()
        return data;
    }
    catch (error) {
        throw error
    }
};

const sortByLastDate = async function (clientData) {
    try {
        let data = await getConnection()
            .getRepository(Biometrics)
            .createQueryBuilder("biometric")
            .where("biometric.status = 1")
            .select([
                "biometric.biometric_id as biometric_id",
                "biometric.file_name as File_Name",
                "biometric.month as Month",
                "biometric.year as Year",
                "biometric.branch_id as Location",
                "biometric.created_at as Date_Uploaded",
                "biometric.updated_at as Last_Modified"
            ])
            .orderBy("biometric.created_at", "DESC")
            .getRawMany()
        return data;
    }
    catch (error) {
        throw error
    }
}

const updateBiometricData = async function (clientData, clientData2, clientData3) {
    try {
        let check_biometric = await getConnection()
            .getRepository(Biometrics)
            .createQueryBuilder("bio")
            .where("status = 1 and month = :month and year = :year and branch_id = :location and biometric_id != :biometric",
                {
                    month: clientData2.month,
                    year: clientData2.year,
                    location: clientData2.branch_id,
                    biometric: clientData.biometric_id
                })
            .select()
            .getOne()

        if (check_biometric) {
            return "0"
        }
        let filename_ = null
        if (clientData3) {
            filename_ = clientData3.filename
        }

        const data = await getConnection()
            .createQueryBuilder()
            .update(Biometrics)
            .set({
                file_name: filename_,
                month: clientData2.month,
                year: clientData2.year,
                branch_id: clientData2.branch_id,
                status: '1',
                updated_at: new Date()
            })
            .where("status = 1 and biometric_id = :biometric_id", { biometric_id: clientData.biometric_id })
            .execute();
        return data;

    } catch (error) {
        throw error;
    }
};

const removeBiometricData = async (clientData) => {
    try {
        //console.log(clientData)
        const data = await getConnection()
            .createQueryBuilder()
            .update(Biometrics)
            .set({
                status: 0,
                updated_at: new Date()
            })
            .where("biometric_id = :biometric_id", { biometric_id: clientData.biometric_id })
            .execute();
        return data
    } catch (error) {
        throw error
    }
}

const fetchBiometricById = async (clientData) => {
    try {
        let data = await getConnection()
            .getRepository(Biometrics)
            .createQueryBuilder("bio")
            .where("bio.status = 1 and bio.biometric_id = :id", {
                id: clientData.biometric_id
            })
            .select([
                "bio.biometric_id as biometric_id",
                "bio.month as month",
                "bio.year as year",
                'bio.file_name as biometric_file',
                'bio.branch_id as branch_id',
                'bio.status as status'
            ])
            .getRawOne()

        return data

    } catch (error) {
        throw error
    }
}

const uploadAttendanceSheet = async (clientparams, clientBody, clientfiles) => {
    try {
       
        let fileName = "";
        let data;
        let values = [];
       
           fileName = clientfiles.filename;

           let filePath = "upload/"+fileName;
         
            let infoFile = fileName.split(".");

            let extention = infoFile[1];

           



            if (extention === "xlsx") {

                // readXlsxFile(filePath).then((rows) => {

                //     console.log(rows);

                //     rows.shift();

                //     let query = 'INSERT INTO  (id, address, name, age) VALUES ?';

                //    getConnection()
                //    .query(query, [rows], (error, response) => {
                //         console.log(error || response);
             
                //         });

                //    // data = await getConnection
    
                // })

                
                XLSX.read
                XLSX.utils.sheet_to_json(fileName)
                

              xlsxtojson({
                    input: "upload/"+fileName,
                    output: null,
                    lowerCaseHeaders: true,
                  
                    
                }, function (err, result) {
                      if (err) {
                          console.error(err);
                      } else {
                         console.log(result);

                         const rest = JSON.stringify(result);

                          console.log(rest);

                        //   result.shift();

                        //   console.log(result);
                     }

                 })

            }
            else if (extention === "xls") {

              xlstojson({
                    input: "upload/"+fileName,
                    output: null,
                    lowerCaseHeaders: true
                }, function (err, result) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(result);
                    }

                })
            }
            else {
                return "0";
            }



            return data;
        // }
    }
    catch (err) {
        throw err;
    }
}





module.exports = {
    fetchBiometricById,
    uploadBiometricData,
    searchBiometricBranchWise,
    searchBiometricMonthWise,
    searchBiometricYearWise,
    searchBiometricAll,
    updateBiometricData,
    removeBiometricData,
    sortByLastDate,
    uploadAttendanceSheet
}

