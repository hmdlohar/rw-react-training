import Config from "../config";
import { IDashboardStats } from "../types/AllTypes";
import { ICompany } from "../types/Companies";
import { IPackage } from "../types/Packages";
import { IUser } from "../types/User";
import http from "./HttpService";
import lsu from "./LocalStorageUtils";

class ApiServices {
    async login(username: string, password: string) {
        let response = await http.post(`${Config.API_URL}/api/public/login/admin`, {
            username,
            password
        })
        return response.data;
    }

    async getCompanyDashboard(): Promise<IDashboardStats> {
        let response = await http.get(`${Config.API_URL}/api/admin/company/dashboard`,
            { Authorization: lsu.lsGet("token") })
        return response.data;
    }

    async getCompanies(): Promise<ICompany[]> {
        let response = await http.get(`${Config.API_URL}/api/admin/company`,
            { Authorization: lsu.lsGet("token") })
        return response.data;
    }

    async getPackages(): Promise<IPackage[]> {
        let response = await http.get(`${Config.API_URL}/api/admin/packages`,
        { Authorization: lsu.lsGet("token") })
        return response.data;
    }
    
    async getUsers(): Promise<[IUser[]]> {
        let response = await http.get(`${Config.API_URL}/api/admin/users`,
            { Authorization: lsu.lsGet("token") })
        return response.data;
    }
}


const api = new ApiServices();
(window as any)["api"] = api;
export default api;
