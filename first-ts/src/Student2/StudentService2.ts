import * as $ from 'jquery'
export interface IStudent2 {
    "StudentID": number,
    "StudentFirstName": string
    "StudentLastName": string
    "StudentEmailID": string
    "StudentPercentage": number,
    "StudentIsActive": boolean
}

export class StudentInsertObject {
    "SID"?: number = 0
    "SFN": string = ""
    "SLN": string = ""
    "SEID": string = ""
    "SP": number = 0
    "SIA": number = 0
}

export interface IFeedback {
    AdditionalInfo: any
    AdditionalInfoKeyNamesContainDataSet: string
    CustomErrorMessage: string
    DBReturnValue: number
    DBReturnValueBoolean: boolean
    DBReturnValueString: string
    IsAdditionalInfoContainsAnyDataSet: boolean
    IsCustomError: boolean
    IsDBReturnValueInteger: boolean
    IsDBReturnValueIsBoolean: boolean
    IsDBReturnValueNotInteger: boolean
    IsDBReturnValueString: boolean
    ObjException: any
    OperationSpecification: number
    ShowErrorMessageInFeedback: boolean
    SourceClassHomeName: string
    WasNoError: boolean
    WasNoErrorAndDBReturnValueIndicatesSuccess: boolean
}

class StudentService2 {

    static async googo(ClassJOperationIC: number, KV: any = {}): Promise<any> {
        var settings = {
            "url": "https://d252-203-187-204-39.ngrok.io/RW2WS/RWStudentWS.asmx/GOOGOLight4Apps",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
                "GJIJ": JSON.stringify({
                    ClassJOperationIC: ClassJOperationIC,
                    KeyValues: KV,
                    __RWAC: "RWCLIENTWEB",
                    _RWSUSC: "OheDoCFqhCZacO1zEZNNJTMbJdSrHB/Vg0mxQQ/TbDa2k3HBQLLqLq2BVb03fcYvjOngVNAvv9FesqEVVFcWfIgo4eJCUuGyQXHRs3jLv9pY1d5DB0t5itUXnQloQsMbPw1SwgiddqgzNgvqNP9kKjkXsv3Wj2f2/NwSmRAIx+73113tnmMVUn7/mM8RXtQj1+Fb/ZOufajvEaoo8Zv6GA=="
                })
            }
        };
        let result = await $.ajax(settings)
        if (!result.d && result.responseText) {
            let objRes: any = JSON.parse(result.responseText)
            throw new Error(objRes.Message)
        }
        return result

    }

    static async list(): Promise<IStudent2[]> {
        try {
            let result = await this.googo(105599905)
            return result.d.Records
        }
        catch (ex) {
            console.log(ex)
            throw new Error('Error occurred while loading student')
        }
    }
    static async detail(StudentID: number): Promise<IStudent2> {
        try {
            let result = await this.googo(105599904, { SID: StudentID })
            return result.d.Records[0]
        }
        catch (ex) {
            console.log(ex)
            throw new Error('Error occurred while loading student')
        }
    }

    static async add(objStudent: StudentInsertObject): Promise<IFeedback> {
        try {
            let result = await this.googo(105599901, objStudent)
            return result.d
        }
        catch (ex) {
            console.log(ex)
            throw new Error('Error occurred while inserting student')
        }

    }

    static async update(StudentID: number, objStudent: StudentInsertObject): Promise<IFeedback> {
        try {
            let result = await this.googo(105599902, { ...objStudent, SID: StudentID })
            return result.d
        }
        catch (ex) {
            console.log(ex)
            throw new Error('Error occurred while inserting student')
        }

    }
    static async delete(StudentID: number): Promise<IFeedback> {

        try {
            let result = await this.googo(105599903, { SID: StudentID })
            return result.d
        }
        catch (ex) {
            console.log(ex)
            throw new Error('Error occurred while Deleting student')
        }

    }

}

//@ts-ignore
window.StudentService2 = StudentService2

export default StudentService2