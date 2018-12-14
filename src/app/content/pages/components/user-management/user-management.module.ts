import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';

import { CodePreviewModule } from '../../../partials/content/general/code-preview/code-preview.module';
import { MaterialPreviewModule } from '../../../partials/content/general/material-preview/material-preivew.module';
import { PartialsModule } from '../../../partials/partials.module';

import {
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
	MatProgressSpinnerModule,
	MatPaginatorModule,
	MatSortModule,
	MatTableModule,
	_MatChipListMixinBase
} from '@angular/material';
@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		RouterModule.forChild([
			{
				path: '',
                component: UserManagementComponent,
                children: [{
                    path: '',
                    component: UserListComponent
                },{
                    path: ':id',
                    component: UserInformationComponent
                }]
			}
        ]),
        
        CodePreviewModule,
		MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MaterialPreviewModule,
        MatProgressSpinnerModule,
        MatSortModule,
		MatButtonModule,
		MatTableModule,
        MatPaginatorModule,
        PartialsModule
	],
	providers: [],
    declarations: [
        UserManagementComponent,
        UserListComponent,
        UserInformationComponent
    ]
})
export class UserManagementModule {}
