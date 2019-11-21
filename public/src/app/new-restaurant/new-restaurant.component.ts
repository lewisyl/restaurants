import { Component, OnInit } from "@angular/core";
import { HttpService } from "../Services/http-service/http.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
    selector: "app-new-restaurant",
    templateUrl: "./new-restaurant.component.html",
    styleUrls: ["./new-restaurant.component.css"]
})
export class NewRestaurantComponent implements OnInit {
    newRestaurant: any;
    errors: any;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this.newRestaurant = { name: "", cuisine: "" };
    }

    onSubmit() {
        this._httpService
            .newRestaurant(this.newRestaurant)
            .subscribe((data: any) => {
                console.log(data);
                if (data.message == "error") {
                    this.errors = data.result;
                }
                this.newRestaurant = { name: "", cuisine: "" };
            });
        this.goHome();
    }

    goHome() {
        this._router.navigate(["/restaurants"]);
    }
}
