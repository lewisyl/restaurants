import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../Services/http-service/http.service";

@Component({
    selector: "app-show-restaurants",
    templateUrl: "./show-restaurants.component.html",
    styleUrls: ["./show-restaurants.component.css"]
})
export class ShowRestaurantsComponent implements OnInit {
    restaurants: any;
    target: any;
    now: any;
    nowTime: any;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this.now = new Date();
        this.nowTime = this.now.getTime();
        this.getAllRestaurants();
        this._route.parent.params.subscribe(params =>
            console.log(`The parent params: ${params}`)
        );
    }

    getAllRestaurants() {
        this._httpService.getAllRestaurants().subscribe(data => {
            console.log(this.nowTime);
            for (let x of data["result"]) {
                let cA = new Date(x.createdAt).getTime();
                if (this.nowTime - cA < 30000) {
                    x.allowDelete = true;
                }
            }
            console.log(data["result"]);
            this.restaurants = data["result"];
        });
    }

    deleteRestaurants(resID: any) {
        this._httpService.deleteRestaurant(resID).subscribe(data => {
            console.log(data);
        });
        this.getAllRestaurants();
    }

    getThisRestaurant(resID: any) {
        this._httpService.getThisRestaurant(resID).subscribe(data => {
            console.log(data);
            this.target = data["result"];
        });
    }
}
