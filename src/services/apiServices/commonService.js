import axios from "../ApiMethods";
import {baseUrl} from "../API";
export const commonService={
    saveServiceMaintence:(data) => {
        return axios.PostData(baseUrl+"/api/service/maintenance/save",data);
    },
    getAllServiceMaintenance : () =>{
        return axios.GetData(baseUrl+"/api/service/maintenance/");
    },
    getSingleServiceMaintenance: (id) => {
        return axios.GetData(baseUrl+`/api/service/maintenance/${id}`);
    },
    deleteServiceMaintenance: (id) => {
        return axios.DeleteData(baseUrl+`/api/service/maintenance/${id}`);
    },
    // updateServiceMaintenance: (bodyData) => {
    //     return axios.PostData(baseUrl+"/api/service/maintenance/save",bodyData);
    // }
}