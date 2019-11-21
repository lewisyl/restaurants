import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class HttpService {
    constructor(private _http: HttpClient) {}

    getAllRestaurants() {
        return this._http.get("/exp-restaurants");
    }

    newRestaurant(newRestaurant: any) {
        return this._http.post("/exp-new", newRestaurant);
    }

    getThisRestaurant(resID: any) {
        return this._http.get(`/exp-restaurants/${resID}`);
    }

    newRate(resID: any, newrate: any) {
        return this._http.put(`/exp-restaurants/review/${resID}`, newrate);
    }

    editRestaurant(resID: any, editRestaurant: any) {
        return this._http.put(`/exp-restaurants/edit/${resID}`, editRestaurant);
    }

    deleteRestaurant(resID: any) {
        return this._http.delete(`/exp-restaurants/${resID}`);
    }
}
