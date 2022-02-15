export interface IStudent {
    "id": number,
    "attributes": {
        "createdAt": string
        "updatedAt": string
        "FirstName": string
        "LastName": string
        "Email": string
        "IsActive": boolean,
        "Percentage": number
    }
}

class StudentService {
    static list() {
        return JSON.parse(localStorage.lstEmployees || "[]")
    }

    // static add(objEmployee: IEmployee) {
    //     let lstEmployees = this.list()
    //     lstEmployees.push(objEmployee)
    //     localStorage.lstEmployees = JSON.stringify(lstEmployees)
    // }

    // static update(EmployeeID: number, objEmployee: Partial<IEmployee>) {
    //     let lstEmployees = this.list()
    //     let existingEmployeeIndex: number = lstEmployees.findIndex((item: any) => item.EmployeeID === EmployeeID)
    //     if (existingEmployeeIndex === -1) { // Employee not found. 
    //         throw new Error('Employee not found with give id. ')
    //     }

    //     lstEmployees[existingEmployeeIndex] = {
    //         ...lstEmployees[existingEmployeeIndex],
    //         ...objEmployee
    //     }

    //     localStorage.lstEmployees = JSON.stringify(lstEmployees)
    // }

    // static delete(EmployeeID: number) {
    //     let lstEmployees = this.list()
    //     console.log(lstEmployees, EmployeeID)
    //     let existingEmployeeIndex: number = lstEmployees.findIndex((item: any) => item.EmployeeID === EmployeeID)
    //     if (existingEmployeeIndex === -1) { // Employee not found. 
    //         throw new Error('Employee not found with give id. ')
    //     }
    //     lstEmployees.splice(existingEmployeeIndex, 1);
    //     localStorage.lstEmployees = JSON.stringify(lstEmployees)
    // }
}

//@ts-ignore
window.StudentService = StudentService

export default StudentService