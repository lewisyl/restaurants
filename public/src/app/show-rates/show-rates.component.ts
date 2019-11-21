import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../Services/http-service/http.service";

@Component({
    selector: "app-show-rates",
    templateUrl: "./show-rates.component.html",
    styleUrls: ["./show-rates.component.css"]
})
export class ShowRatesComponent implements OnInit {
    resID: any;
    rates: Object;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            this.resID = params["resID"];
        });
        this.getAllRates(this.resID);
    }

    getAllRates(resID: any) {
        this._httpService.getThisRestaurant(resID).subscribe(data => {
            this.rates = data["result"].rates;
            console.log(this.rates);
        });
    }
}
