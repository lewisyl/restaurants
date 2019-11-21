import { Component, OnInit } from "@angular/core";
import { HttpService } from "../Services/http-service/http.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
    selector: "app-edit-restaurant",
    templateUrl: "./edit-restaurant.component.html",
    styleUrls: ["./edit-restaurant.component.css"]
})
export class EditRestaurantComponent implements OnInit {
    target: any;
    resID: any;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this.target = { name: "", cuisine: "" };
        this._route.params.subscribe((params: Params) => {
            this.resID = params["resID"];
        });
        this.getThisRestaurant(this.resID);
    }

    getThisRestaurant(resID: any) {
        this._httpService.getThisRestaurant(this.resID).subscribe(data => {
            console.log(data);
            this.target = data["result"];
        });
    }

    onSubmit() {
        this._httpService
            .editRestaurant(this.resID, this.target)
            .subscribe(data => {
                console.log(data);
                this.target = { name: "", cuisine: "" };
            });
        this.goHome();
    }

    goHome() {
        this._router.navigate(["/restaurants"]);
    }
}
