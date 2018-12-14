import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, EventEmitter, ApplicationRef, NgZone } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatInput } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { merge, Observable, of as observableOf, from } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UserModel } from 'app/api/structure';
import { HttpDao } from 'app/api/HttpDao';
import { TokenStorage } from 'app/core/auth/token-storage.service';

    
@Component({
	selector: 'm-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
})

export class UserListComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = [
        'no',
        'contact.picture', 
        'firstName', 
        'lastName', 
        'contact.email', 
        'contact.phone', 
        'createdAt',
        'buttons'
        ];

    dataSource: UserModel[] = [];
    database: HttpDao | null;

    resultsLength: Number = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild('matFilter') filter: MatInput;

    @ViewChild('matPaginator') paginator: MatPaginator;

    @ViewChild('sort') sort: MatSort;

    changeFilter: EventEmitter<any> = new EventEmitter();
    filterValue: string = "";

    ngAfterViewInit() {
    }

    constructor(private http: HttpClient,
                private tokenStorage: TokenStorage,
                private applicationRef: ApplicationRef,
                private router: Router,
                private _ngZone: NgZone) {
    }

    ngOnInit() {
        // Example 
        this.database = new HttpDao(this.http, this.tokenStorage);

        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page, this.changeFilter)
        .pipe(
        startWith({}),
        switchMap(() => {
            this.isLoadingResults = true;
            // tslint:disable-next-line:no-non-null-assertion
            return from(this.database!.getUserList({
                filter: this.filterValue,
                sort: {
                    field: this.sort.active ? this.sort.active : "",
                    direction: this.sort.direction
                },
                paginator: {
                    pageSize: this.paginator.pageSize ? this.paginator.pageSize : 10,
                    pageIndex: this.paginator.pageIndex
                }
            }));
        }),
        map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.total_count;

            for (var i = 0; i < data.items.length; i ++)
                data.items [i].no = this.paginator.pageSize * this.paginator.pageIndex + i + 1;
            
            setTimeout(() => {
                this.applicationRef.tick();
                this._ngZone.run(() => {});
            }, 500);
            return data.items;
        }),
        catchError(() => {
            this.isLoadingResults = false;
            // Catch if the GitHub API has reached its rate limit. Return empty data.
            this.isRateLimitReached = true;
            return observableOf([]);
        })
        ).subscribe(data => this.dataSource = data);
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.filterValue = filterValue;
        this.changeFilter.emit(filterValue);
    }

    onShow(event: Event, _id: string) {
        this.router.navigate([this.router.url + '/' + _id]);
    }

    onToggleStatus(event: Event, _id: String, status: Boolean) {
        this.database!
            .setUserStatus(_id, status)
            .then(data => {
                if (data.result < 0)    return;
                for (var i = 0; i < this.dataSource.length; i ++) {
                    if (this.dataSource [i]._id == _id) {
                        this.dataSource [i].status = status;
                        break;
                    }
                }
                setTimeout(() => {
                    this.applicationRef.tick();
                    this._ngZone.run(() => {});
                }, 500);
            })
            .catch(error => {
                console.log("error", error);
            })
//        this.changeFilter.emit(this.filterValue);
    }
}

