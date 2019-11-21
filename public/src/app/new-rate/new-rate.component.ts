import { Component, OnInit } from "@angular/core";
import { HttpService } from "../Services/http-service/http.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
    selector: "app-new-rate",
    templateUrl: "./new-rate.component.html",
    styleUrls: ["./new-rate.component.css"]
})
export class NewRateComponent implements OnInit {
    newRate: any;
    errors: any;
    resID: any;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this.newRate = { customer: "", rate: null, description: "" };
        this._route.params.subscribe((params: Params) => {
            this.resID = params["resID"];
        });
    }

    onSubmit() {
        this._httpService
            .newRate(this.resID, this.newRate)
            .subscribe((data: any) => {
                console.log(data);
                if (data.message == "error") {
                    this.errors = data.result;
                }
                this.newRate = { name: "", cuisine: "" };
            });
        this.goReviews(this.resID);
    }

    goReviews(resID: any) {
        this._router.navigate(["/restaurants", resID]);
    }
}
