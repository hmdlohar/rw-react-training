export interface IEmployee {
    EmployeeID: number
    Name: string
    Designation: string
    Salary: number
    IsActive: boolean
}

class EmployeeService {
    static list() {
        return JSON.parse(localStorage.lstEmployees || "[]")
    }

    static add(objEmployee: IEmployee) {
        let lstEmployees = this.list()
        lstEmployees.push(objEmployee)
        localStorage.lstEmployees = JSON.stringify(lstEmployees)
    }

    static update(EmployeeID: number, objEmployee: IEmployee) {
        let lstEmployees = this.list()
        let existingEmployeeIndex: number = lstEmployees.findIndex((item:any)=>item.EmployeeID === EmployeeID)
        if (!existingEmployeeIndex) { // Employee not found. 
            throw new Error('Employee not found with give id. ')
        }

        lstEmployees[existingEmployeeIndex] = {
            ...lstEmployees[existingEmployeeIndex],
            ...objEmployee
        }

        localStorage.lstEmployees = JSON.stringify(lstEmployees)
    }

    static delete(EmployeeID: number) {
        let lstEmployees = this.list()
        let existingEmployeeIndex: number = lstEmployees.findIndex((item:any)=>item.EmployeeID === EmployeeID)
        if (!existingEmployeeIndex) { // Employee not found. 
            throw new Error('Employee not found with give id. ')
        }
        lstEmployees.splice(existingEmployeeIndex, 1);
        localStorage.lstEmployees = JSON.stringify(lstEmployees)
    }
}

//@ts-ignore
window.EmployeeService = EmployeeService

export default EmployeeService