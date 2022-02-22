class ApiServices {
    async login(username: string, password: string) {
        await new Promise(resolve => setTimeout(resolve, 3000))
        if (username === "admin" && password === "admin") {
            return {
                firstName: "Hamid",
                lastName: "Lohar",
                email: "hmdlohar@gmail.com",
                id: 1
            }
        }

        throw new Error('Invalid credentials.')
    }
}


const api = new ApiServices();
(window as any)["api"] = api;
export default api;
