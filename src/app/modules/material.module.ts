import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatSidenavContainer,
  MatSidenavModule
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules]
})
export class MaterialModule {}
