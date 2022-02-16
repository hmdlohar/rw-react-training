import * as $ from 'jquery'
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

export class StudentInsertObject {
    "FirstName": string = ""
    "LastName": string = ""
    "Email": string = ""
    "Percentage": number = 0
    "IsActive": boolean = false
}

class StudentService {
    static async list(): Promise<IStudent[]> {
        try {
            const result = await $.ajax({
                url: "http://localhost:1337/api/students",
            })
            return result.data
        }
        catch (ex) {
            console.log(ex)
            throw new Error('Error occurred while loading student')
        }
    }
    static async detail(id: number): Promise<IStudent> {
        try {
            const result = await $.ajax({
                url: `http://localhost:1337/api/students/${id}`,
            })
            return result.data
        }
        catch (ex) {
            console.log(ex)
            throw new Error('Error occurred while loading student')
        }
    }

    static async add(objStudent: StudentInsertObject) {
        var settings = {
            "url": "http://localhost:1337/api/students",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "data": objStudent
            }),
        };
        try {
            const result = await $.ajax(settings)
            return result.data
        }
        catch (ex) {
            console.log(ex)
            throw new Error('Error occurred while inserting student')
        }

    }

    static async update(id: number, objStudent: StudentInsertObject) {
        var settings = {
            "url": `http://localhost:1337/api/students/${id}`,
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "data": objStudent
            }),
        };
        try {
            const result = await $.ajax(settings)
            return result.data
        }
        catch (ex) {
            console.log(ex)
            throw new Error('Error occurred while inserting student')
        }

    }
    static async delete(id: number) {
        var settings = {
            "url": `http://localhost:1337/api/students/${id}`,
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "data": {}
            }),
        };
        try {
            const result = await $.ajax(settings)
            return result.data
        }
        catch (ex) {
            console.log(ex)
            throw new Error('Error occurred while Deleting student')
        }

    }

}

//@ts-ignore
window.StudentService = StudentService

export default StudentService