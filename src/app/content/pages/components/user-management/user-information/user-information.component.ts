import { Component, OnInit, ChangeDetectionStrategy, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpDao } from 'app/api/HttpDao';
import { TokenStorage } from 'app/core/auth/token-storage.service';
import { UserModel } from 'app/api/structure';

@Component({
  selector: 'm-user-information',
	templateUrl: './user-information.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class UserInformationComponent implements OnInit {

    id: String = "";
    database: HttpDao | null;
    userModel: UserModel = null;

    constructor(private http: HttpClient,
                private tokenStorage: TokenStorage,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private applicationRef: ApplicationRef) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(param => {
            this.id = param.id;
            
            this.database = new HttpDao(this.http, this.tokenStorage);
            this.database
                .getUserInformation(this.id)
                .then(data => {
                    this.userModel = data;
                    this.applicationRef.tick();
                })
                .catch(error => {
                    console.log("error", error);
                })
        });
    }

    onBack($event) {
//        $event.preventDefault();
        this.router.navigate(["/user-management"]);
        return false;
    }
}
